// interceptor to handle JWT authentication in all http requests and responses

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                withCredentials: true,
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                },
            });
        }
        return next.handle(request);
    }
}