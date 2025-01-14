import { Component, Input } from '@angular/core';
import { getInitial } from 'src/app/utils/format.util';

@Component({
  selector: 'app-user-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './user-thumbnail.component.html',
  styleUrl: './user-thumbnail.component.scss',
})
export class UserThumbnailComponent {
  // firstname
  @Input() firstName = '';
  // lastname
  @Input() lastName = '';
  // thumbnail
  @Input() thumbnail?: string;

  /**
   * return initial
   */
  get initial(): string {
    if (this.firstName !== '' && this.lastName !== '') {
      return getInitial(`${this.firstName} ${this.lastName}`, 2);
    } else {
      return '';
    }
  }
}
