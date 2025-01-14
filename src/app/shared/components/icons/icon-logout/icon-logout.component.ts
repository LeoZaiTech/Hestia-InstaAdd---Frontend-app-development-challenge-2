import { Component, Input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-logout',
  templateUrl: './icon-logout.component.html',
  styleUrls: ['./icon-logout.component.scss'],
})
export class IconLogoutComponent extends IconBaseComponent {
  @Input() width: number | string = 16;
  @Input() height: number | string = 16;
  @Input() color = '#26aed1';

  constructor() {
    super();
  }
}
