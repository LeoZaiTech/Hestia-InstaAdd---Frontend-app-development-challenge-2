import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from 'src/app/components/common/sub-header/sub-header.component';

@Component({
  selector: 'app-review-submitted',
  templateUrl: './review-submitted.component.html',
  styleUrls: ['./review-submitted.component.scss'],
  standalone: true,
  imports: [CommonModule, SubHeaderComponent]
})
export class ReviewSubmittedComponent {
  breadcrumbs = [
    { label: 'Home', href: '/home' },
    { label: 'Submit a form', href: '/home/submit-code' },
    { label: 'Review' }
  ];

  requiredInfo = {
    vendor: 'PRO-FLO PRODUCTS INC.(23832)',
    altCode: 'W381359074',
    productDescription: 'Description lorem ipsum dolor amet',
    listPrice: '49.95',
    unitOfMeasure: 'GL (Gigalitre)',
    lineBuy: 'HVAC Components (HV001)',
    discountGroup: 'Bulk Order (DG002)',
    hazardousMaterial: 'Yes',
    safetyDataSheet: 'https://chemicalsafety.com/sds1/sdsviewer.php?id=35520628&name=Fananserin'
  };

  optionalInfo = {
    manufacturerPartNumber: '381359074',
    upc: '1-50884-23164-0',
    productWeight: '1.58',
    unitOfWeight: 'LB (Pounds)',
    specSheet: 'SpecSheet Lorem Ipsum.pdf'
  };

  constructor(private router: Router) {}

  onBack() {
    this.router.navigate(['/home/submit-info-optional']);
  }

  onSubmit() {
    // Handle submit logic
    this.router.navigate(['/home/submit-code']);
  }

  onCancel() {
    this.router.navigate(['/home/submit-code']);
  }
}
