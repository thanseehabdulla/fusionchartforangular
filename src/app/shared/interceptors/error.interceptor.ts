// interceptor to handle error in all http requests and responses

import { NotifyService } from 'src/app/shared/services/notify.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private notifyService: NotifyService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.logout();
            }
            this.notifyService.showError(err.error.error);
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}