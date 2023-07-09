import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/auth/login', { username, password }).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }

  register(username: string, email: string, password: string, invitationCode: string): Observable<User> {
    return this.http.post<User>('/auth/login', { username, email, password, invitationCode }).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }
  

  private setSession(authResult: any): void {
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
