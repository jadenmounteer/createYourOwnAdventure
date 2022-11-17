import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth-service/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  // This interceptor adds the auth token to all outgoing requests.
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (user.id === '') {
          return next.handle(req);
        }

        // We only add the token if we have a user
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', String(user.token)),
        });
        return next.handle(modifiedReq);
      })
    );
  }

  constructor(private authService: AuthService) {}
}
