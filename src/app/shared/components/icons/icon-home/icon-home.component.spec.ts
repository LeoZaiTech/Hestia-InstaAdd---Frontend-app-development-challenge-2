import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IconHomeComponent } from './icon-home.component';

describe('IconHomeComponent', () => {
  let component: IconHomeComponent;
  let fixture: ComponentFixture<IconHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IconHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
