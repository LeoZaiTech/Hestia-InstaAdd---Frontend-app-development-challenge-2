import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubHeaderComponent } from 'src/app/components/common/sub-header/sub-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SubHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  breadcrumbs = [{ label: 'Home' }];
}
