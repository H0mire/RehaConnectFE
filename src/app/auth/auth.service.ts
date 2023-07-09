import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { tap, shareReplay, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:3001/auth/login', { username, password }).pipe(
		tap(authResult => this.setSession(authResult))
	  );
  }

  register(username: string, email: string, password: string, invitationCode: string): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:3001/auth/register', { username, email, password, invitationCode }).pipe(
		tap(authResult => this.setSession(authResult))
	  );
  }
  

  private setSession(authResult: any): void {
	alert(authResult);
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): moment.Moment {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
