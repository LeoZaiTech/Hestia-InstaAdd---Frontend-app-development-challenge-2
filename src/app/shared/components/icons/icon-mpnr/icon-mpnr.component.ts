import { Component, input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-mpnr',
  templateUrl: './icon-mpnr.component.html',
  styleUrl: './icon-mpnr.component.scss',
})
export class IconMpnrComponent extends IconBaseComponent {
  color = input('#00a0dd');

  constructor() {
    super();
  }
}
