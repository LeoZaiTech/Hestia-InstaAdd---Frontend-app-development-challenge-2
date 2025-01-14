import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMpnrComponent } from './icon-mpnr.component';

describe('IconMpnrComponent', () => {
  let component: IconMpnrComponent;
  let fixture: ComponentFixture<IconMpnrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconMpnrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconMpnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
