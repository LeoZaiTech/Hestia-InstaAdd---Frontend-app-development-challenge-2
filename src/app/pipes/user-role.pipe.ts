import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from 'src/app/models/components/user-info';
import { environment } from 'src/environments/environment';

const { userRoleMap } = environment;

@Pipe({
  name: 'userRole',
  standalone: true,
})
export class UserRolePipe implements PipeTransform {
  /**
   * transform user role to displayable string
   * @param value user role
   */
  transform(value: UserRole): string {
    // switch by user role with role map
    switch (value) {
      // for admin
      case userRoleMap['admin'].value: {
        return userRoleMap['admin'].label;
      }

      // for contributor
      case userRoleMap['contributor'].value: {
        return userRoleMap['contributor'].label;
      }

      // for reader
      case userRoleMap['reader'].value: {
        return userRoleMap['reader'].label;
      }

      default:
        return '';
    }
  }
}
