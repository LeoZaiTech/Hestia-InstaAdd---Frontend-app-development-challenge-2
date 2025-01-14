import { Component, HostBinding, Input } from '@angular/core';
import { isFloat } from 'src/app/utils/validation.util';

export type DividerColor = 'default' | 'transparent';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
})
export class DividerComponent {
  // set width
  @Input() set width(width: number | string) {
    this._width = width;
  }
  // set height
  @Input() set height(height: number | string) {
    this._height = height;
  }
  // divider color
  @Input() @HostBinding('attr.ldm-divider-color') color: DividerColor = 'default';
  // get width for style
  @HostBinding('style.width') get dividerWidth(): string {
    return typeof this._width === 'number' || isFloat(this._width)
      ? this._width + 'px'
      : this._width;
  }
  // get height for style
  @HostBinding('style.height') get dividerHeight(): string {
    return typeof this._height === 'number' || isFloat(this._height)
      ? this._height + 'px'
      : this._height;
  }

  // width
  private _width: string | number = 0;
  // height
  private _height: string | number = 0;
}
