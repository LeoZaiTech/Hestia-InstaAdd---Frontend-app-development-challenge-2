import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSelectArrowComponent } from './icon-select-arrow.component';

describe('IconSelectArrowComponent', () => {
  let component: IconSelectArrowComponent;
  let fixture: ComponentFixture<IconSelectArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconSelectArrowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconSelectArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
