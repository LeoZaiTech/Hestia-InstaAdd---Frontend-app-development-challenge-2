import { Component } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-loading',
  templateUrl: './icon-loading.component.html',
  styleUrl: './icon-loading.component.scss',
})
export class IconLoadingComponent extends IconBaseComponent {
  constructor() {
    super();
  }
}
