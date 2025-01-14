import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { SharedModule } from 'src/app/shared';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-welcome-dialog',
  standalone: true,
  imports: [SharedModule, IconsModule],
  templateUrl: './welcome-dialog.component.html',
  styleUrl: './welcome-dialog.component.scss',
})
export class WelcomeDialogComponent {
  dialogRef = inject<DialogRef>(DialogRef);
  private storageService = inject(StorageService);

  isAlwaysShowWelcome = true;
  tabSelectedIndex = 0;

  close(): void {
    this.dialogRef.close();
  }

  updateAlwaysShowWelcome(value: boolean): void {
    this.isAlwaysShowWelcome = value;
    this.storageService.setItem<boolean>('isAlwaysHideWelcome', !value);
  }

  next(): void {
    if (this.tabSelectedIndex < 2) {
      this.tabSelectedIndex++;
    } else {
      this.dialogRef.close();
    }
  }
}
