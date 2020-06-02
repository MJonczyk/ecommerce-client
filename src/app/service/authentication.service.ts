import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const apiUrl = 'http://localhost:8080';
@Injectable()
export class AuthenticationService {
  private jwtHelper;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  login(username: string, password: string) {
    return this.http.post(`${apiUrl}/login`, { username, password }, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  saveToken(token: string) {
    token = token.slice(7);
    localStorage.setItem('jwttoken', token);
    localStorage.setItem('expDate', this.jwtHelper.getTokenExpirationDate(token));
    console.log(localStorage.getItem('jwttoken'));
    console.log(localStorage.getItem('expDate'));
  }

  logout() {
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('expDate');
  }

  getExpirationTime() {
    const expDate = localStorage.getItem('expDate');
    if ( expDate != null) {
      return new Date(expDate);
    } else {
      return new Date(0);
    }
    }

  isLoggedIn(){
    return new Date().getTime() > this.getExpirationTime().getTime();
  }

  isLoggedOut(){
    return !this.isLoggedIn();
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
