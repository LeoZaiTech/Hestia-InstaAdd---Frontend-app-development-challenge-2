import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUpcComponent } from './icon-upc.component';

describe('IconUpcComponent', () => {
  let component: IconUpcComponent;
  let fixture: ComponentFixture<IconUpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconUpcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconUpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
