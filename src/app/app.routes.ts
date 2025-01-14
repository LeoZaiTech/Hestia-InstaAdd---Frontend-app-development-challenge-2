import { Routes } from '@angular/router';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { MaterialComponent } from './pages/material/material.component';
import { SubmitProductCodeComponent } from './pages/submit-product-code/submit-product-code.component';
import { SubmitProductInfoComponent } from './pages/submit-product-info/submit-product-info.component';
import { MainGuard } from './guards/main.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/submit-code',
    pathMatch: 'full',
  },
  {
    path: 'signin-oidc',
    component: MsalRedirectComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'home',
    children: [
      { path: '', redirectTo: '/home/submit-code', pathMatch: 'full' },
      { path: 'submit-code', component: SubmitProductCodeComponent },
      { path: 'submit-info', component: SubmitProductInfoComponent },
    ],
    canActivate: [MainGuard],
  },
  {
    path: 'angular-material',
    component: MaterialComponent,
  },
  { path: '**', redirectTo: 'home/submit-code' },
];
