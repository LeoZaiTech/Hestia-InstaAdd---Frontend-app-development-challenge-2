import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SubmitProductCodeComponent } from './submit-product-code.component';

describe('SubmitProductCodeComponent', () => {
  let component: SubmitProductCodeComponent;
  let fixture: ComponentFixture<SubmitProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitProductCodeComponent, RouterModule.forRoot([])],
      providers: [provideAnimations(), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
