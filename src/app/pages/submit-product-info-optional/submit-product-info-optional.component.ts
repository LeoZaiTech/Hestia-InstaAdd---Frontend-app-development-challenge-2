import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from 'src/app/components/common/sub-header/sub-header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-product-info-optional',
  standalone: true,
  imports: [SubHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './submit-product-info-optional.component.html',
  styleUrls: ['./submit-product-info-optional.component.scss']
})
export class SubmitProductInfoOptionalComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
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

  constructor(private fb: FormBuilder, private router: Router) {
    this.optionalForm = this.fb.group({
      manufacturerPartNumber: [''],
      upc: [''],
      productWeight: [''],
      weightUnit: ['LB'],
      specSheet: [null]
    });

    // Track UPC length
    this.optionalForm.get('upc')?.valueChanges.subscribe(value => {
      this.upcLength = value ? value.length : 0;
    });
  }

  onBack() {
    this.router.navigate(['/home/submit-info']);
  }

  onNext() {
    // Store optional form data
    localStorage.setItem('optionalFormData', JSON.stringify(this.optionalForm.value));
    this.router.navigate(['/home/preview']);
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf' && file.size <= 25 * 1024 * 1024) {
      this.optionalForm.patchValue({
        specSheet: file
      });
    } else {
      // Handle invalid file
      console.error('Invalid file. Please select a PDF file under 25MB.');
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' && file.size <= 25 * 1024 * 1024) {
        this.optionalForm.patchValue({
          specSheet: file
        });
      } else {
        // Handle invalid file
        console.error('Invalid file. Please select a PDF file under 25MB.');
      }
    }
  }
}
