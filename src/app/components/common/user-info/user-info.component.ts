import { Component, Input, HostBinding } from '@angular/core';
import { UserInfo } from 'src/app/models/components/user-info';
import { UserThumbnailComponent } from '../user-thumbnail/user-thumbnail.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [UserThumbnailComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  // user info
  @Input() user: UserInfo | null | undefined = undefined;
  // set true to show all info from mobile view
  @Input() @HostBinding('class.show-all') showAll = false;
}
