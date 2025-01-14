import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBreadcrumbSeparatorComponent } from './icon-breadcrumb-separator.component';

describe('IconBreadcrumbSeparatorComponent', () => {
  let component: IconBreadcrumbSeparatorComponent;
  let fixture: ComponentFixture<IconBreadcrumbSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconBreadcrumbSeparatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconBreadcrumbSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
