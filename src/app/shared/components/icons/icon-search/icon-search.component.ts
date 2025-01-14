import { Component, input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-search',
  templateUrl: './icon-search.component.html',
  styleUrl: './icon-search.component.scss',
})
export class IconSearchComponent extends IconBaseComponent {
  color = input('#1272BC');

  constructor() {
    super();
  }
}
