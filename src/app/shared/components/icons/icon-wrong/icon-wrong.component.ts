import { Component } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-wrong',
  templateUrl: './icon-wrong.component.html',
  styleUrl: './icon-wrong.component.scss',
})
export class IconWrongComponent extends IconBaseComponent {
  constructor() {
    super();
  }
}
