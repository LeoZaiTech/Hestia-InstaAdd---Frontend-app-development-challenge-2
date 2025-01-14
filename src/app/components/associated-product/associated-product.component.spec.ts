import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProductComponent } from './associated-product.component';

describe('AssociatedProductComponent', () => {
  let component: AssociatedProductComponent;
  let fixture: ComponentFixture<AssociatedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatedProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociatedProductComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
