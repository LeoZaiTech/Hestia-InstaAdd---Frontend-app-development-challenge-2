import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  // mobile menu opened subject
  private readonly _mobileMenuOpened$ = new BehaviorSubject<boolean>(false);

  /**
   * set mobileMenuOpened state
   * @param state state
   */
  set mobileMenuOpened(state: boolean) {
    this._mobileMenuOpened$.next(state);
  }

  /**
   * get mobileMenuOpened as stream
   */
  get mobileMenuOpened$(): Observable<boolean> {
    return this._mobileMenuOpened$.asObservable();
  }
}
