import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = new URL(`${environment.REQRES_URL}${request.url}`);
    url.searchParams.append('delay', '2');
    request = request.clone({
      url: url.toString(),
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });

    return next.handle(request);
  }
}
