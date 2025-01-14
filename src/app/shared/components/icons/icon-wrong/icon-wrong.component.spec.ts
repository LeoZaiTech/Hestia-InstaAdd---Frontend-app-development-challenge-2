import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWrongComponent } from './icon-wrong.component';

describe('IconWrongComponent', () => {
  let component: IconWrongComponent;
  let fixture: ComponentFixture<IconWrongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconWrongComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconWrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
