import { NotifyService } from 'src/app/shared/services/notify.service';
import { HttpConnectionService } from './http-connection.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private httpService: HttpConnectionService,
        private router: Router,
        private notifyService: NotifyService
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    // POST: Login to the application
    login(usercode: string, password: string): Observable<any> {
        return this.httpService.post_auth('/auth/login', { usercode, password })
            .pipe(map(response => {
                // Store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(response.payload));
                this.currentUserSubject.next(response.payload);
                return response['payload'];
            }));
    }

    // POST: Logout from the application
    logout() {
        // Remove user from local storage to log user out
        this.httpService.post('/auth/logout').subscribe(
            (data: any) => {
                if (localStorage.getItem('currentUser'))
                    localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);
                this.router.navigate(['/user/login']);
            },
            (error: Error) => this.notifyService.showError(error.message)
        )

    }

    /*-------CHANGE PASSWORD--------*/
    // POST: Verify usercode and current password
    verifyUserCodeAndPassword(usercode: string, password: string): Observable<any> {
        return this.httpService.post_auth('/auth/verify', { usercode, password })
            .pipe(map(response => {
                return response['payload'];
            }));
    }

    // POST: Change password
    changePassword(usercode: string, currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
        return this.httpService.post_auth(
            '/auth/changepassword',
            { usercode, currentPassword, newPassword, confirmPassword }
        )
            .pipe(map(response => {
                return response['payload'];
            }))
    }



    /*-------FORGOT PASSWORD--------*/
    // GET: Verify usercode and get user details
    verifyUserCode(usercode: string): Observable<any> {
        return this.httpService.get(`/employee/${usercode}`)
            .pipe(map(response => {
                return response['payload'].employee;
            }));
    }

    // POST: Verify OTP
    verifyOTP(otp): Observable<any> {
        return this.httpService.post_auth(`/auth/otp`, {otp})
        .pipe(map(response => {
            return response['payload'];
        }))
    }

    // POST: Change password
    forgotPassword(usercode: string, newPassword: string, confirmPassword: string) {
        return this.httpService.post_auth('/auth/forgotpassword', {usercode, newPassword, confirmPassword})
            .pipe(map(response => {
                return response['payload'];
            }))
    }


}
