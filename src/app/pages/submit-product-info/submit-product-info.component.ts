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

  showLineBuyDropdown = false;
  selectedLineBuy: any = null;

  recommendedLineBuys = [
    { name: 'Plumbing Fixtures (PL001)', rating: 3 },
    { name: 'HVAC Components (HV001)', rating: 2 },
    { name: 'Industrial Valves (IV001)', rating: 1 }
  ];

  defaultLineBuy = { name: 'Default Line Buy (LB001)' };

  showDiscountGroupDropdown = false;
  selectedDiscountGroup: any = null;

  recommendedDiscountGroups = [
    { name: 'Preferred Customer (DG001)', rating: 3 },
    { name: 'Bulk Order (DG002)', rating: 2 },
    { name: 'Seasonal Promo (DG003)', rating: 1 }
  ];

  defaultDiscountGroup = { name: 'No Discount (DG004)' };

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
      lineBuy: [this.defaultLineBuy.name, { disabled: true }],
      discountGroup: [this.defaultDiscountGroup.name, { disabled: true }],
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

  toggleLineBuyDropdown() {
    this.showLineBuyDropdown = !this.showLineBuyDropdown;
  }

  selectLineBuy(lineBuy: any) {
    this.selectedLineBuy = lineBuy;
    this.productForm.get('lineBuy')?.setValue(lineBuy.name);
    this.showLineBuyDropdown = false;
  }

  toggleDiscountGroupDropdown() {
    this.showDiscountGroupDropdown = !this.showDiscountGroupDropdown;
  }

  selectDiscountGroup(discountGroup: any) {
    this.selectedDiscountGroup = discountGroup;
    this.productForm.get('discountGroup')?.setValue(discountGroup.name);
    this.showDiscountGroupDropdown = false;
  }
}
