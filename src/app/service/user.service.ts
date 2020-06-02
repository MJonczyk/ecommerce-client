import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../model/User';
import {throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const apiUrl = 'http://localhost:8080';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${apiUrl}/register`, user)
      .pipe(
        catchError(this.handleError),
        tap(data => console.log(data)
        )
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error ocurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}. body was: ${error.error}`);
    }

    return throwError('An unknown error has ocurred.');
  }
}
