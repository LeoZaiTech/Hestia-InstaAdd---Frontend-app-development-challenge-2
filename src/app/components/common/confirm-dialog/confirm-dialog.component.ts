import { Component, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  readonly data = inject<
    | {
        defaultDialog?: boolean;
        title?: string;
        desc?: string;
        width?: number;
        noLabel?: string;
        yesLabel?: string;
        yesColor?: string;
      }
    | undefined
  >(MAT_DIALOG_DATA);

  buttons = computed(() =>
    this.data?.defaultDialog
      ? [
          {
            label: this.data?.yesLabel || 'OK',
            value: true,
            color: this.data?.yesColor || 'var(--primary)',
          },
        ]
      : [
          {
            label: this.data?.noLabel || 'Cancel',
            value: false,
            color: 'var(--primary)',
            variant: 'stroked',
          },
          {
            label: this.data?.yesLabel || 'OK',
            value: true,
            color: this.data?.yesColor || 'var(--primary)',
          },
        ]
  );
}
