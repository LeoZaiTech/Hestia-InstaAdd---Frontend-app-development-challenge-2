import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconOpenComponent } from './icon-open.component';

describe('IconOpenComponent', () => {
  let component: IconOpenComponent;
  let fixture: ComponentFixture<IconOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconOpenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
