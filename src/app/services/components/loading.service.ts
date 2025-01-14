import { Injectable, inject } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ModalLoadingComponent } from 'src/app/components/common/modal-loading/modal-loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  dialog = inject(Dialog);
  dialogRef?: DialogRef<string>;

  private count = 0;
  private isShowLoading = false;

  start(message?: string) {
    if (this.isShowLoading) {
      this.count += 1;
      return;
    }

    this.isShowLoading = true;
    this.dialogRef = this.dialog.open<string>(ModalLoadingComponent, {
      data: message,
    });
  }

  stop() {
    if (this.count === 0) {
      this.isShowLoading = false;
      this.dialogRef?.close();
    } else {
      this.count -= 1;
    }
  }
}
