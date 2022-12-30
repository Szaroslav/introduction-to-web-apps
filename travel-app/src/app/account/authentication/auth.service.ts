import { catchError, of, tap, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from './auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    AUTH_LOGIN_URL = '/api/auth/login';
    AUTH_REGISTER_URL = '/api/auth/register';
    REDIRECT_URL = '/account/login';
    ACCOUNT_URL = '/account';
    isAuth = false;
    accessToken: string | null;
    refreshToken: string | null;
    username: string | null;
    permissionsLevel: string | null;

    constructor(private http: HttpClient) {
        this.accessToken        = sessionStorage.getItem('accessToken');
        this.refreshToken       = sessionStorage.getItem('refreshToken');
        this.username           = sessionStorage.getItem('username');
        this.permissionsLevel   = sessionStorage.getItem('permissionsLevel');
        this.isAuth             = this.refreshToken !== null;
    }

    isAuthenticated(): boolean {
        return this.isAuth;
    }

    login(userId: string | null, password: string | null): Observable<any> {
        return this.http.post<AuthResponse>(this.AUTH_LOGIN_URL, { userId: userId, password: password })
            .pipe(
                tap(res => {
                    if (!res.isSuccess)
                        return;
                    
                    this.isAuth = true;
                    this.accessToken = res.accessToken!;
                    this.refreshToken = res.refreshToken!;
                    this.username = res.username!;
                    this.permissionsLevel = res.permissionsLevel!;

                    sessionStorage.setItem('accessToken', this.accessToken);
                    sessionStorage.setItem('refreshToken', this.refreshToken);
                    sessionStorage.setItem('username', this.username);
                    sessionStorage.setItem('permissionsLevel', this.permissionsLevel);
                })
            );
    }

    logout(): void {
        this.isAuth = false;

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('permissionsLevel');
    }

    register(user: any): Observable<any> {
        return this.http.post<AuthResponse>(this.AUTH_REGISTER_URL, user)
            .pipe(
                tap(res => {
                    console.log(res);
                })
            );
    }
}