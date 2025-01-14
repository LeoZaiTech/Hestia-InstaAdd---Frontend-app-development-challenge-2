import { Component, input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-arrow-right',
  templateUrl: './icon-arrow-right.component.html',
  styleUrl: './icon-arrow-right.component.scss',
})
export class IconArrowRightComponent extends IconBaseComponent {
  color = input('white');

  constructor() {
    super();
  }
}
