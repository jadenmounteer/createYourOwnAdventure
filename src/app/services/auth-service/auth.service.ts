import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/auth/user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = environment.apiKey;
  public user = new Subject<User>();

  constructor(private http: HttpClient) {}

  public signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,

        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  public login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate: string = String(
      new Date(new Date().getTime() + expiresIn * 1000)
    );
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';

        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign in is disabled.';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'You have failed to sign up too many times. Please try again later.';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'The password you entered is incorrect.';
        break;

      case 'USER_DISABLED':
        errorMessage = 'This user is disabled.';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}
