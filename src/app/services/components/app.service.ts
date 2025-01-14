import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/components/user-info';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MsalService } from '@azure/msal-angular';
import { StorageService } from 'src/app/services/storage/storage.service';

const { userRoleMap } = environment;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private authService = inject(MsalService);
  private storageService = inject(StorageService);

  // signed user subject
  private readonly _user$ = new BehaviorSubject<UserInfo | undefined>(undefined);
  // show guide subject
  private readonly _showGuide$ = new BehaviorSubject<boolean>(true);
  // 'true' when access to the app is failed and 'Retry' option wasn't clicked (e.g. user clicks 'OK'/close button when access to backend is failed)
  private readonly _isBackendAccessInFailedState$ = new BehaviorSubject<boolean>(false);

  /**
   * set signed user
   * @param user signed user
   */
  set user(user: UserInfo | undefined) {
    this._user$.next(user);
  }

  /**
   * get signed user as stream
   */
  get user$(): Observable<UserInfo | undefined> {
    return this._user$.asObservable();
  }

  set isBackendAccessInFailedState(value: boolean) {
    this._isBackendAccessInFailedState$.next(value);
  }

  get isBackendAccessInFailedState$(): Observable<boolean> {
    return this._isBackendAccessInFailedState$.asObservable();
  }

  /**
   * return true when user is signed in
   */
  get isSignedIn$(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  /**
   * return true when user is admin
   */
  get isAdmin$(): Observable<boolean> {
    return this.user$.pipe(map((user) => user?.role === userRoleMap['admin'].value));
  }

  /**
   * set showGuide state
   * @param state state
   */
  set showGuide(state: boolean) {
    this._showGuide$.next(state);
  }

  /**
   * return showGuide state as stream
   */
  get showGuide$(): Observable<boolean> {
    return this._showGuide$.asObservable();
  }

  /**
   * process logout
   */
  logout(): void {
    this.authService.logoutRedirect().subscribe(() => {
      this.user = undefined;
      this.storageService.user = undefined;
      this.storageService.token = '';
    });
  }
}
