import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDn8j4BaTdv63f1xxvIpGL37h9Q6CSgMrQ',

        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
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
          }

          return throwError(() => new Error(errorMessage));
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDn8j4BaTdv63f1xxvIpGL37h9Q6CSgMrQ',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
