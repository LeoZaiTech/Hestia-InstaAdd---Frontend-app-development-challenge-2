import { Component, inject, input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';
import { Product } from 'src/app/models/apis/product';

@Component({
  selector: 'app-associated-product',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './associated-product.component.html',
  styleUrl: './associated-product.component.scss',
})
export class AssociatedProductComponent {
  private _snackBar = inject(MatSnackBar);

  product = input.required<Product>();

  copyText(text: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this._snackBar.open(
          `The text "${text}" has been successfully copied to the clipboard.`,
          'OK',
          {
            duration: 2000,
          }
        );
      })
      .catch((err: Error) => {
        console.error('Copy Error:', err);
        this._snackBar.open(`The text "${text}" failed to copy to the clipboard.`, 'OK', {
          duration: 2000,
        });
      });
  }
}
