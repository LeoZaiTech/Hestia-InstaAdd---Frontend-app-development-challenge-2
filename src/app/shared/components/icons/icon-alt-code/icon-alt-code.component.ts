import { Component, input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-alt-code',
  templateUrl: './icon-alt-code.component.html',
  styleUrl: './icon-alt-code.component.scss',
})
export class IconAltCodeComponent extends IconBaseComponent {
  color = input('#00a0dd');

  constructor() {
    super();
  }
}
