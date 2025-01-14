import { Component, HostBinding, input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, IconsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  width = input(555);
  title = input('');
  buttons = input<
    { label: string; value?: unknown; color?: string; disabled?: boolean; variant?: string }[]
  >([]);

  @HostBinding('style.width.px')
  private get _width() {
    return this.width();
  }
}
