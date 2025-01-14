import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTipComponent } from './icon-tip.component';

describe('IconTipComponent', () => {
  let component: IconTipComponent;
  let fixture: ComponentFixture<IconTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconTipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
