import { Component, Input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-close',
  templateUrl: './icon-close.component.html',
  styleUrls: ['./icon-close.component.scss'],
})
export class IconCloseComponent extends IconBaseComponent {
  @Input() closeIconColor = '#fff';

  constructor() {
    super();
  }
}
