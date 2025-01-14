import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest, EventMessage, EventType } from '@azure/msal-browser';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { AppService } from 'src/app/services/components/app.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { InfoModalService } from 'src/app/services/components/info-modal.service';
import { UserHttpService } from 'src/app/services/apis/user-http.service';
import { LayoutComponent } from 'src/app/components/common/layout/layout.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';
import { WelcomeDialogComponent } from 'src/app/components/welcome-dialog/welcome-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, LayoutComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private appService = inject(AppService);
  private authService = inject(MsalService);
  private msalGuardConfig = inject<MsalGuardConfiguration>(MSAL_GUARD_CONFIG);
  private msalBroadcastService = inject(MsalBroadcastService);
  private dialog = inject(MatDialog);
  private cdkDialog = inject(Dialog);
  private storageService = inject(StorageService);
  private infoModalService = inject(InfoModalService);
  private userHttpService = inject(UserHttpService);
  private readonly _destroying$ = new Subject<void>();

  isGettingUser = false;

  get isLoginCompleted(): Observable<boolean> {
    return this.appService.isSignedIn$;
  }

  get isAppInFailedState(): Observable<boolean> {
    return this.appService.isBackendAccessInFailedState$;
  }

  constructor() {
    if (environment.azure_monitor_connection_string) {
      const angularPlugin = new AngularPlugin();
      const appInsights = new ApplicationInsights({
        config: {
          connectionString: environment.azure_monitor_connection_string,
          extensions: [angularPlugin],
          extensionConfig: {
            [angularPlugin.identifier]: { router: this.router },
          },
        },
      });
      appInsights.loadAppInsights();
    }
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe(); // Subscribing to handleRedirectObservable before any other functions both initializes the application and ensures redirects are handled

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.SSO_SILENT_SUCCESS ||
            msg.eventType === EventType.LOGIN_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        console.log(
          'Landing -> ngOnInit -> msalSubject$[filter:SSO_SILENT_SUCCESS|LOGIN_SUCCESS]: ' +
            JSON.stringify(result)
        );
        if (this.authService.instance.getAllAccounts().length === 0) {
          this.loginRedirect();
        } else {
          this.getLoggedInUser();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe((result: InteractionStatus) => {
        console.log(
          'Landing -> ngOnInit -> inProgress$[filter:InteractionStatus.None]: ' +
            JSON.stringify(result)
        );
        this.getLoggedInUser();
        this.checkAndSetActiveAccount();
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  /**
   * set user and go to home
   */
  private getLoggedInUser(retryNumber = 0): void {
    if (this.isGettingUser) return;

    const handleError = (err: HttpErrorResponse) => {
      this.appService.user = undefined;
      this.storageService.user = undefined;

      const errorDescription =
        environment.errorStatusDescriptions[err.status] ?? 'Application error';

      // close previous modal
      this.infoModalService.closeLast();

      // // retry the request
      if (retryNumber < environment.retryDelays.length) {
        // do not show error popup for the first retry
        if (retryNumber > 0) {
          // show retry attempt message
          const message = `${errorDescription}. Retry attempt: ${retryNumber}/${environment.retryDelays.length - 1}`;
          this.infoModalService.show(message, 'Application error');
        }

        const retryDelay = environment.retryDelays[retryNumber];
        setTimeout(() => {
          this.getLoggedInUser(retryNumber + 1);
        }, retryDelay * 1000);
      } else {
        // all retries failed, display error message to user
        const message = `${errorDescription}`;
        this.dialog
          .open(ConfirmDialogComponent, {
            data: {
              defaultDialog: false,
              title: 'Application error',
              desc: message,
              yesLabel: 'Retry',
            },
          })
          .afterClosed()
          .subscribe((confirmed: boolean) => {
            if (confirmed) {
              // 'Retry' clicked
              window.location.reload();
            } else {
              // 'Cancel' button clicked - set backend failed state
              this.appService.isBackendAccessInFailedState = true;
            }
          });
      }
    };

    this.isGettingUser = true;
    this.userHttpService.getLoggedInUser().subscribe({
      next: (userResp) => {
        this.isGettingUser = false;

        // close all modal
        this.infoModalService.closeAll();

        const user = userResp;
        if (user) {
          this.appService.user = user;
          this.storageService.user = user;

          this.showWelcome();

          this.route.queryParams.subscribe((params) => {
            // get return url from route parameters or to '/home'
            const returnUrl = params['returnUrl'];
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
            } else if (this.router.url === 'signin-oidc') {
              // navigate to home page
              this.router.navigate(['/home']);
            }
          });
        } else {
          handleError(
            new HttpErrorResponse({
              error: new Error('Application Service error or unable to find user'),
            })
          );
        }
      },
      error: (err) => {
        this.isGettingUser = false;
        handleError(err);
      },
    });
  }

  private showWelcome() {
    if (!this.storageService.getItem('isAlwaysHideWelcome')) {
      this.cdkDialog.open(WelcomeDialogComponent);
    }
  }
}
