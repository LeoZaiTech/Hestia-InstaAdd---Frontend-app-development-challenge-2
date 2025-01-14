import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AppService } from '../services/components/app.service';
import { StorageService } from '../services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { UserInfo } from 'src/app/models/components/user-info';

export const MainGuard: CanActivateFn = (_, state) => {
  const router = inject(Router);
  const authService = inject(MsalService);
  const appService = inject(AppService);
  const storageService = inject(StorageService);

  // get user form local storage
  appService.user = storageService.user;

  if (environment.enableAzureLogin !== 'true') {
    const mockUser: UserInfo = {
      id: '1234',
      username: 'John Smith',
      givenName: 'John',
      familyName: 'Smith',
      role: 'admin',
      roles: [],
      email: 'John.Smith@Ferguson.com',
    };
    appService.user = mockUser;
    return true;
  }

  const isSignedIn = authService.instance.getAllAccounts().length > 0;
  if (!isSignedIn) {
    storageService.user = undefined;
    appService.user = undefined;
    router.navigate(['signin-oidc'], {
      queryParams: { returnUrl: state.url },
    });
  } else {
    appService.user = storageService.user;
  }

  return isSignedIn;
};
