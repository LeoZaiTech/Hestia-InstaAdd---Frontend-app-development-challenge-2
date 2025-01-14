import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { SearchableInputComponent } from './searchable-input.component';

describe('SearchInputComponent', () => {
  let component: SearchableInputComponent;
  let fixture: ComponentFixture<SearchableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchableInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchableInputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('inputControl', new FormControl(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
