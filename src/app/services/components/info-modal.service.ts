import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class InfoModalService {
  private _dialog = inject(MatDialog);
  private _dialogRef?: MatDialogRef<ConfirmDialogComponent>;

  show(desc: string, title = ''): void {
    this._dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        defaultDialog: true,
        title: title,
        desc: desc,
      },
    });
  }

  closeLast(): void {
    this._dialogRef?.close();
  }

  closeAll(): void {
    this._dialog.closeAll();
  }
}
