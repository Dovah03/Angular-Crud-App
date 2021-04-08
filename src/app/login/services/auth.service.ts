import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor(private router: Router){}
  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login() : void {
    this.isLoginSubject.next(true);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout() : void {
    if(!!localStorage.getItem('JWT'))
    localStorage.removeItem('JWT');
    this.isLoginSubject.next(false);
    
  }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken() : boolean {
    return !!localStorage.getItem('JWT');
  }
}
