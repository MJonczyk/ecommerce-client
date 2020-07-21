import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let message = '';

          if (error.error instanceof ErrorEvent) {
            message = `An error occurred: ${error.message}`;
          } else {
            message = `Backend returned code ${error.status}. body was: ${error.error}`;
          }

          console.log(message);
          return throwError(message);
        })
      );
  }
}
