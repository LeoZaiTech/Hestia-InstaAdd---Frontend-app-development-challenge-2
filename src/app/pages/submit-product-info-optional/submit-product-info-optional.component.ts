import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from 'src/app/components/common/sub-header/sub-header.component';

@Component({
  selector: 'app-submit-product-info-optional',
  standalone: true,
  imports: [SubHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './submit-product-info-optional.component.html',
  styleUrls: ['./submit-product-info-optional.component.scss']
})
export class SubmitProductInfoOptionalComponent {
  @Output() goBack = new EventEmitter<void>();
  @Output() goToPreview = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  breadcrumbs = [
    { label: 'Home', href: '/home' },
    { label: 'Submit a form', href: '/home/submit-code' },
    { label: 'Optional Info' }
  ];

  optionalForm: FormGroup;
  upcLength = 0;

  constructor(private fb: FormBuilder) {
    this.optionalForm = this.fb.group({
      manufacturerPartNumber: [''],
      upc: [''],
      productWeight: [''],
      weightUnit: [''],
      specSheet: [null]
    });

    // Track UPC length
    this.optionalForm.get('upc')?.valueChanges.subscribe(value => {
      this.upcLength = value ? value.length : 0;
    });
  }

  onBack() {
    this.goBack.emit();
  }

  onNext() {
    if (this.optionalForm.valid) {
      this.goToPreview.emit(this.optionalForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.optionalForm.patchValue({
        specSheet: file
      });
    }
  }
}
