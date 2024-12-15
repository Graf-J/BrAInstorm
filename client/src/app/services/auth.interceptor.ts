import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt: string | null = localStorage.getItem('jwt');
    if (jwt) {
      const clonedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${ jwt }`)
      })

      return next.handle(clonedRequest);
    } else {
        return next.handle(request);
    }
  }
}
