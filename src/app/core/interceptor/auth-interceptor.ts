import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept<T, R>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<R>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case UNAUTHORIZED:
            console.log('desa1');
            this.router.navigate(['login']);
            return throwError(() => error);
          case FORBIDDEN:
            console.log('desa2');
            this.router.navigate(['login']);
            return throwError(() => error);
          default:
            console.log('desa3');
            return throwError(() => error);
        }
      })
    );
  }
}
