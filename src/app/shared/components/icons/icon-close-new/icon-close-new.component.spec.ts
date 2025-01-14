import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCloseNewComponent } from './icon-close-new.component';

describe('IconCloseNewComponent', () => {
  let component: IconCloseNewComponent;
  let fixture: ComponentFixture<IconCloseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconCloseNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconCloseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
