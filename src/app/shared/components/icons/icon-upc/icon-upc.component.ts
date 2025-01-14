import { Component, input } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-upc',
  templateUrl: './icon-upc.component.html',
  styleUrl: './icon-upc.component.scss',
})
export class IconUpcComponent extends IconBaseComponent {
  color = input('#00a0dd');

  constructor() {
    super();
  }
}
