import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCorrectComponent } from './icon-correct.component';

describe('IconCorrectComponent', () => {
  let component: IconCorrectComponent;
  let fixture: ComponentFixture<IconCorrectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconCorrectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconCorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
