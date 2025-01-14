export type UserRole = 'admin' | 'contributor' | 'reader';

export interface UserInfo {
  id: string;
  username: string;
  givenName: string;
  familyName: string;
  role: UserRole;
  roles: UserRole[];
  email: string;
}
