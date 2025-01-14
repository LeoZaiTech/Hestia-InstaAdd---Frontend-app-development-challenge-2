import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-icon-base',
  template: '',
})
export class IconBaseComponent {
  // clickable state
  @Input() @HostBinding('class.clickable') clickable = false;
  // icon default class
  @HostBinding('class.ldm-icon') iconClass = true;
}
