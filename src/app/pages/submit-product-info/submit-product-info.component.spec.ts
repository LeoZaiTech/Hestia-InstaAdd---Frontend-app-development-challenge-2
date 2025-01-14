import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { SubmitProductInfoComponent } from './submit-product-info.component';

describe('SubmitProductInfoComponent', () => {
  let component: SubmitProductInfoComponent;
  let fixture: ComponentFixture<SubmitProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitProductInfoComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
