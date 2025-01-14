import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubHeaderComponent } from 'src/app/components/common/sub-header/sub-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submit-product-info',
  standalone: true,
  imports: [SubHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './submit-product-info.component.html',
  styleUrls: ['./submit-product-info.component.scss'],
})
export class SubmitProductInfoComponent implements OnInit {
  breadcrumbs = [
    { label: 'Home', href: '/home' },
    { label: 'Submit a form', href: '/home/submit-code' },
    { label: 'Product Info' },
  ];

  productForm!: FormGroup;
  descriptionLength = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.productForm = this.fb.group({
      vendor: ['PRO-FLO PRODUCTS INC (23832)', { disabled: true }],
      altCode: ['W381359074', { disabled: true }],
      description: ['', [Validators.required, Validators.maxLength(35)]],
      listPrice: [null, [Validators.required, Validators.min(0)]],
      uom: ['', Validators.required],
      lineBuy: ['Default Line Buy (LB001)', { disabled: true }],
      discountGroup: ['No Discount (DG004)', { disabled: true }],
      isHazardous: [false],
    });

    // Track description length
    this.productForm.get('description')?.valueChanges.subscribe(value => {
      this.descriptionLength = value?.length || 0;
    });
  }

  onCancel() {
    // Navigate back or handle cancel
  }

  onNext() {
    if (this.productForm.valid) {
      // Handle form submission
      console.log(this.productForm.value);
    }
  }
}
