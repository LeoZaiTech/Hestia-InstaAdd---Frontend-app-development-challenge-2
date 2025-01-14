import { UserRoleMap } from 'src/app/models/components/user-role-map';
import { UserRole } from 'src/app/models/components/user-info';

export const commonEnvironments = {
  // userRoleMap to display user role in UI
  userRoleMap: {
    admin: { value: 'admin', label: 'Admin' },
    contributor: { value: 'contributor', label: 'Contributor' },
    reader: { value: 'reader', label: 'Reader' },
  } as Record<string, UserRoleMap>,
  // user role who can create
  creatableUserRoles: ['admin'] as UserRole[],
  // user role who can edit
  editableUserRoles: ['admin', 'contributor'] as UserRole[],
  // default page size for pageable table
  defaultPageSize: 10,
  // default page size options for pageable table
  defaultSizeOptions: [10, 20, 50],
  errorStatusDescriptions: {
    0: 'Application Service unavailable',
    400: 'Bad request',
    401: 'User identity not found',
    403: 'Application authentication failed',
    500: 'Application Service error',
  } as Record<number, string>,
  // / Retry delays in Seconds. First retry is almost immediate
  retryDelays: [1, 10, 20, 30],
};
