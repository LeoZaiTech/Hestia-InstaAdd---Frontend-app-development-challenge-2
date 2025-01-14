import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAltCodeComponent } from './icon-alt-code.component';

describe('IconAltCodeComponent', () => {
  let component: IconAltCodeComponent;
  let fixture: ComponentFixture<IconAltCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconAltCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconAltCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
