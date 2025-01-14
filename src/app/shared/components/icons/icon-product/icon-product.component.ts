import { Component } from '@angular/core';
import { IconBaseComponent } from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-product',
  templateUrl: './icon-product.component.html',
  styleUrl: './icon-product.component.scss',
})
export class IconProductComponent extends IconBaseComponent {
  constructor() {
    super();
  }
}
