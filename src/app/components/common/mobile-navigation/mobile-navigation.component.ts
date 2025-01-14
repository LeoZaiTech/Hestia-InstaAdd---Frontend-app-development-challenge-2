import { Component, HostBinding, HostListener, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';
import { AppService } from 'src/app/services/components/app.service';
import { MainService } from 'src/app/services/components/main.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { detectScreenWidth } from 'src/app/utils/detector.util';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-mobile-navigation',
  standalone: true,
  imports: [AsyncPipe, RouterLink, IconsModule, UserInfoComponent],
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.scss',
  animations: [
    trigger('fade', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      state(
        'fade-in',
        style({
          opacity: 1,
        })
      ),
      transition('void <=> *', animate('.3s ease')),
    ]),
  ],
})
export class MobileNavigationComponent {
  @HostBinding('@fade') animation = 'fade-in';

  appService = inject(AppService);
  mainService = inject(MainService);
  storageService = inject(StorageService);
  private authService = inject(MsalService);

  // is mobile
  private _isMobile = false;

  /**
   * process logout
   */
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.appService.user = undefined;
      this.mainService.mobileMenuOpened = false;
      this.storageService.user = undefined;
    });
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    const width = detectScreenWidth();

    // close when screen to be bigger than mobile
    if (this._isMobile && width > 767) {
      this.mainService.mobileMenuOpened = false;
    }

    this._isMobile = width < 768;
  }
}
