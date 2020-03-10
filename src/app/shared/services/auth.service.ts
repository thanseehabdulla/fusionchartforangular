import { HttpConnectionService } from './http-connection.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpService: HttpConnectionService) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  // Login to the application
  login(usercode: string, password: string) {
      return this.httpService.post_login('/auth/login', { usercode, password })
          .pipe(map(response => {
              // Store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(response.payload));
              this.currentUserSubject.next(response.payload);
              return response.payload;
          }));
  }

  // Logout from the application
  logout() {
      // Remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      return this.httpService.post('/auth/logout')
  }
}
