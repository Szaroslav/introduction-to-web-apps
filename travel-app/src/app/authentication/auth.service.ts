import { catchError, of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    AUTH_LOGIN_URL = '/api/account/login';
    AUTH_REGISTER_URL = '/api/account/register';
    REDIRECT_URL = '/account/login';
    ACCOUNT_URL = '/account';
    isAuthenticated = false;

    constructor(private http: HttpClient) {}

    login(userId: string, password: string): void {
        this.http
            .post<any>(this.AUTH_LOGIN_URL, { userId: userId, password: password })
            .pipe(catchError((error: any, caught: Observable<any>): Observable<boolean> => {
                console.log(error);
                return of(false);
            }))
            .subscribe(_ => {
                this.isAuthenticated = true;
                return of(true);
            });
    }

    logout(): void {
        this.isAuthenticated = false;
    }
}