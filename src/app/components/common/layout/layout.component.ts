import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MainService } from 'src/app/services/components/main.service';
import { HeaderComponent } from '../header/header.component';
import { MobileNavigationComponent } from '../mobile-navigation/mobile-navigation.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, MobileNavigationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  mainService = inject(MainService);
}
