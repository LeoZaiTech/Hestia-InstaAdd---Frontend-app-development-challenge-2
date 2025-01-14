import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-modal-loading',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './modal-loading.component.html',
  styleUrl: './modal-loading.component.scss',
})
export class ModalLoadingComponent {
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);
}
