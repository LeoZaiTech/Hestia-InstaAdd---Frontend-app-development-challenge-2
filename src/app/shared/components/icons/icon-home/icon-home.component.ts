import { Component } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-home',
  templateUrl: './icon-home.component.html',
  styleUrls: ['./icon-home.component.scss'],
})
export class IconHomeComponent extends IconBaseComponent {
  constructor() {
    super();
  }
}
