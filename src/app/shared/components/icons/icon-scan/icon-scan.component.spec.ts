import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconScanComponent } from './icon-scan.component';

describe('IconScanComponent', () => {
  let component: IconScanComponent;
  let fixture: ComponentFixture<IconScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconScanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
