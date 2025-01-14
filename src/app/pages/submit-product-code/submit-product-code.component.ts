import { Component, inject, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';
import { SubHeaderComponent } from 'src/app/components/common/sub-header/sub-header.component';
import { SearchableInputComponent } from 'src/app/components/common/searchable-input/searchable-input.component';
import { SearchableSelectComponent } from 'src/app/components/common/searchable-select/searchable-select.component';
import { AssociatedProductComponent } from 'src/app/components/associated-product/associated-product.component';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';
import { VendorService } from 'src/app/services/apis/vendor.service';
import { Vendor } from 'src/app/models/apis/vendor';
import { ProductService } from 'src/app/services/apis/product.service';
import { Product } from 'src/app/models/apis/product';

@Component({
  selector: 'app-submit-product-code',
  standalone: true,
  imports: [
    SharedModule,
    IconsModule,
    SubHeaderComponent,
    SearchableInputComponent,
    SearchableSelectComponent,
    AssociatedProductComponent,
    TooltipDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './submit-product-code.component.html',
  styleUrl: './submit-product-code.component.scss',
})
export class SubmitProductCodeComponent {
  router = inject(Router);
  vendorService = inject(VendorService);
  productService = inject(ProductService);

  breadcrumbs = [{ label: 'Home', href: '/home' }, { label: 'Submit a form' }];

  tooltipPositions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetX: 0,
      offsetY: 12,
    },
  ];
  tooltipPositionsMobile: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: 24,
      offsetY: 12,
    },
  ];
  tooltipHtmlContent = `
    <div class="d-flex flex-column gap-20">
      <div class="d-flex align-items-center gap-16">
        <img src="assets/images/alt-code.svg" class="icon" alt="Alt Code icon" />
        <span class="text"
          ><span class="text-bold">Alt Code</span> : Ferguson’s default code that associated with a
          product.</span
        >
      </div>
      <div class="d-flex align-items-center gap-16">
        <img src="assets/images/mpnr.svg" class="icon" alt="Manufacturer Part Number icon" />
        <span class="text"
          ><span class="text-bold">MPNr</span> : Manufacturer Part Number - Unique identifier assigned
          by a manufacturer.</span
        >
      </div>
      <div class="d-flex align-items-center gap-16">
        <img src="assets/images/upc.svg" class="icon" alt="Universal Product Code icon" />
        <span class="text"
          ><span class="text-bold">UPC</span> : Universal Product Code - 12-digit numeric code that
          corresponded to the barcode.</span
        >
      </div>
    </div>
  `;

  tabSelectedIndex = 0;

  checkingText = 'Checking product code…';
  correctText = 'Code is valid and available for submission.';
  wrongText = 'A product with this code already exists.';

  altCodeFormControl = new FormControl('');
  isAltCodeSearching = false;
  altCodeResultType: 'correct' | 'wrong' | null = null;
  altCodeExistingProduct: Product | undefined = undefined;

  mpnFormControl = new FormControl('');
  isMPNSearching = false;
  mpnResultType: 'correct' | 'wrong' | null = null;
  mpnExistingProduct: Product | undefined = undefined;

  upcFormControl = new FormControl<number | null>(null);
  isUPCSearching = false;
  upcResultType: 'correct' | 'wrong' | null = null;
  upcExistingProduct: Product | undefined = undefined;

  mpnVendorFormControl = new FormControl('');
  selectedMPNVendorId = '';

  upcVendorFormControl = new FormControl('');
  selectedUPCVendorId = '';

  vendors: Vendor[] = [];

  constructor() {
    effect((onCleanup) => {
      const subscription = new Subscription();

      subscription.add(
        this.altCodeFormControl.valueChanges.subscribe(() => {
          this.isAltCodeSearching = false;
          this.altCodeResultType = null;
          this.altCodeExistingProduct = undefined;
        })
      );

      subscription.add(
        this.mpnFormControl.valueChanges.subscribe(() => {
          this.isMPNSearching = false;
          this.mpnResultType = null;
          this.mpnExistingProduct = undefined;
        })
      );

      subscription.add(
        this.upcFormControl.valueChanges.subscribe(() => {
          this.isUPCSearching = false;
          this.upcResultType = null;
          this.upcExistingProduct = undefined;
        })
      );

      subscription.add(
        this.mpnVendorFormControl.valueChanges.subscribe(() => {
          this.isMPNSearching = false;
          this.mpnResultType = null;
          this.mpnExistingProduct = undefined;

          this.selectedMPNVendorId = '';
        })
      );

      subscription.add(
        this.upcVendorFormControl.valueChanges.subscribe(() => {
          this.isUPCSearching = false;
          this.upcResultType = null;
          this.upcExistingProduct = undefined;

          this.selectedUPCVendorId = '';
        })
      );

      onCleanup(() => {
        subscription.unsubscribe();
      });
    });

    effect((onCleanup) => {
      const subscription = this.vendorService.getVendors().subscribe((res) => {
        this.vendors = res;
      });

      onCleanup(() => {
        subscription.unsubscribe();
      });
    });
  }

  selectVendor(type: 'mpn' | 'upc', vendor: Vendor): void {
    if (type === 'mpn') {
      this.mpnVendorFormControl.setValue(vendor.name!);
      this.selectedMPNVendorId = vendor.id!;
    } else if (type === 'upc') {
      this.upcVendorFormControl.setValue(vendor.name!);
      this.selectedUPCVendorId = vendor.id!;
    }
  }

  onVendorInputBlur(type: 'mpn' | 'upc'): void {
    if (type === 'mpn' && !this.selectedMPNVendorId) {
      this.mpnVendorFormControl.reset();
    } else if (type === 'upc' && !this.selectedUPCVendorId) {
      this.upcVendorFormControl.reset();
    }
  }

  searchProductByAltCode(): void {
    if (!this.altCodeFormControl.value) return;

    this.isAltCodeSearching = true;
    this.productService
      .searchProductByCode({
        altCode: this.altCodeFormControl.value,
      })
      .subscribe((res) => {
        this.isAltCodeSearching = false;
        if (res?.status === 200 && res?.body) {
          this.altCodeResultType = 'wrong';
          this.altCodeExistingProduct = res.body;
        } else if (res?.status === 204) {
          this.altCodeResultType = 'correct';
          this.altCodeExistingProduct = undefined;
        }
      });
  }

  searchProductByMPN(): void {
    if (!this.mpnFormControl.value || !this.selectedMPNVendorId) return;

    this.isMPNSearching = true;
    this.productService
      .searchProductByCode({
        productCode: this.mpnFormControl.value,
        vendorId: this.selectedMPNVendorId,
      })
      .subscribe((res) => {
        this.isMPNSearching = false;
        if (res?.status === 200 && res?.body) {
          this.mpnResultType = 'wrong';
          this.mpnExistingProduct = res.body;
        } else if (res?.status === 204) {
          this.mpnResultType = 'correct';
          this.mpnExistingProduct = undefined;
        }
      });
  }

  searchProductByUPC(): void {
    if (!this.upcFormControl.value || !this.selectedUPCVendorId) return;

    this.isUPCSearching = true;
    this.productService
      .searchProductByCode({
        upc: this.upcFormControl.value ? String(this.upcFormControl.value) : null,
        vendorId: this.selectedUPCVendorId,
      })
      .subscribe((res) => {
        this.isUPCSearching = false;
        if (res?.status === 200 && res?.body) {
          this.upcResultType = 'wrong';
          this.upcExistingProduct = res.body;
        } else if (res?.status === 204) {
          this.upcResultType = 'correct';
          this.upcExistingProduct = undefined;
        }
      });
  }

  next(): void {
    this.router.navigate(['/home/submit-info']);
  }
}
