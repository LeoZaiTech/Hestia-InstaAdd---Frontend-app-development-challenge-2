import { Component, input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-close-new',
  templateUrl: './icon-close-new.component.html',
  styleUrl: './icon-close-new.component.scss',
})
export class IconCloseNewComponent extends IconBaseComponent {
  color = input('#4E575F');

  constructor() {
    super();
  }
}
