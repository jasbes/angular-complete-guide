import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

interface StoredUser {
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userSubject = new BehaviorSubject<User>(null);

    logoutTimeout: any;

    constructor(private http: HttpClient, private router: Router) {

    }

    signup(email: string, password: string) {
        return this
            .http
            .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    autoLogin() {
        const storedUser: StoredUser = JSON.parse(localStorage.getItem("userData"));
        if (!storedUser) {
            return;
        }

        const user = new User(storedUser.email, storedUser.id, storedUser._token, new Date(storedUser._tokenExpirationDate));

        this.userSubject.next(user);

        this.autoLogout(user.tokenExpirationDateken.getTime() - new Date().getTime());
    }

    autoLogout(experationInMilliseconds: number) {
        this.logoutTimeout = setTimeout(() => {
            this.logout();
        }, experationInMilliseconds);
    }

    login(email: string, password: string) {
        return this
            .http
            .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem("userData");

        if(this.logoutTimeout) {
            clearTimeout(this.logoutTimeout);
        }

        this.logoutTimeout = null;
    }

    private handleError(errorResp: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred.';

        if (!errorResp.error || !errorResp.error.error) {
            return throwError(errorMessage);
        }

        switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect password!';
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.userSubject.next(user);
        localStorage.setItem("userData", JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);
    }

}