import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';
import { Breadcrumb } from 'src/app/models/components/breadcrumb';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [RouterLink, IconsModule],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss',
})
export class SubHeaderComponent {
  router = inject(Router);
  breadcrumbs = input<Breadcrumb[]>([
    {
      label: 'Home',
    },
  ]);

  onHomeClick() {
    const currentUrl = this.router.url;

    if (currentUrl === '/home/submit-code') {
      window.location.reload();
    } else {
      this.router.navigate(['/home/submit-code']);
    }
  }
}
