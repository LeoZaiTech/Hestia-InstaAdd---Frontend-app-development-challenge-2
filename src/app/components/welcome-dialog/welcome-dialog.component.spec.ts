import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@angular/cdk/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WelcomeDialogComponent } from './welcome-dialog.component';

describe('WelcomeDialogComponent', () => {
  let component: WelcomeDialogComponent;
  let fixture: ComponentFixture<WelcomeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeDialogComponent],
      providers: [provideAnimations(), { provide: DialogRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
