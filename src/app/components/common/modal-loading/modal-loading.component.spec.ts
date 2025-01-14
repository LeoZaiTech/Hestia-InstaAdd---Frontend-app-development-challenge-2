import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import { ModalLoadingComponent } from './modal-loading.component';

describe('ModalLoadingComponent', () => {
  let component: ModalLoadingComponent;
  let fixture: ComponentFixture<ModalLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLoadingComponent],
      providers: [
        { provide: DialogRef, useValue: {} },
        { provide: DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
