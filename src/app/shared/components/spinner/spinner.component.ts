import { Component, HostBinding, Input } from '@angular/core';

export type AppSpinnerAlign = 'left' | 'center' | 'right';
export type AppSpinnerColor = 'default' | 'white';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  // spinner size
  @Input() size = 20;
  // container height
  @Input() height = 0;
  // spinner align
  @Input() @HostBinding('attr.ts-align') align: AppSpinnerAlign = 'center';
  // spinner color
  @Input() @HostBinding('attr.ts-color') color: AppSpinnerColor = 'default';
  // spinner border width
  @Input() borderWidth = 2;
  // the period time of the animation (might use bigger values for larger spinners)
  @Input() periodSec = 0.7;
  // get host height
  @HostBinding('style.height') get hostHeight(): string | null {
    return this.height ? `${this.height}px` : null;
  }
}
