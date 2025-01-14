import { Component, input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-required',
  template: `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" [attr.fill]="color()"/>
      <rect x="12.5" y="11" width="15" height="18" rx="1.5" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.5 11V13C16.5 13.2761 16.7239 13.5 17 13.5H23C23.2761 13.5 23.5 13.2761 23.5 13V11" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 17L21.1756 19.382L23.8042 19.7639L21.9021 21.618L22.3511 24.2361L20 23L17.6489 24.2361L18.0979 21.618L16.1958 19.7639L18.8244 19.382L20 17Z" stroke="white" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>
  `,
  styles: [':host { display: inline-flex; }']
})
export class IconRequiredComponent extends IconBaseComponent {
  color = input('#00446A');

  constructor() {
    super();
  }
}
