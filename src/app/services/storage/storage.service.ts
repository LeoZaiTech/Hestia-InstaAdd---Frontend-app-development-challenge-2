import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/models/components/user-info';

/**
 * store data to local storage
 * @param key key
 * @param data data to store
 */
function storeToLocalStorage(key: string, data: unknown): void {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(data || null));
  }
}

/**
 * fetch data from local storage
 * @param key key
 */
function fetchFromLocalStorage<T>(key: string): T | undefined {
  if (localStorage) {
    const fetched = localStorage.getItem(key);

    return fetched ? JSON.parse(fetched) : null;
  }

  return;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // user key
  private readonly userKey = 'HESTIA_USER';

  // login token key
  private readonly loginTokenKey = 'LOGIN_TOKEN';

  /**
   * set login token.
   * @param _token to set in session storage
   */
  set token(_token: string) {
    storeToLocalStorage(this.loginTokenKey, _token);
  }

  /**
   * get login token
   */
  get token(): string | undefined {
    return fetchFromLocalStorage<string>(this.loginTokenKey);
  }

  /**
   * set user info
   * @param user user
   */
  set user(user: UserInfo | undefined) {
    storeToLocalStorage(this.userKey, user);
  }

  /**
   * get user info
   */
  get user(): UserInfo | undefined {
    return fetchFromLocalStorage<UserInfo>(this.userKey);
  }

  /**
   * Set item value
   */
  setItem<T>(key: string, value: T): void {
    storeToLocalStorage(key, value);
  }

  /**
   * Get item value
   */
  getItem(key: string): string | undefined {
    return fetchFromLocalStorage<string>(key);
  }
}
