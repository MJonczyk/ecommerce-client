import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {tap} from 'rxjs/operators';

const apiUrl = 'http://localhost:8080';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${apiUrl}/register`, user)
      .pipe(
        tap(data => console.log(data)
        )
      );
  }
}
