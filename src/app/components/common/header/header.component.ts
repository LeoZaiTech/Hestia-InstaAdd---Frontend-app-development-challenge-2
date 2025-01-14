import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AppService } from 'src/app/services/components/app.service';
import { MainService } from 'src/app/services/components/main.service';
import { IconsModule } from 'src/app/shared/components/icons/icons.module';
import { DividerComponent } from '../divider/divider.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, IconsModule, DividerComponent, UserInfoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  appService = inject(AppService);
  mainService = inject(MainService);

  /**
   * process logout
   */
  logout(): void {
    this.appService.logout();
  }
}
