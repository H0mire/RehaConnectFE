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

  //Login des Benutzers; Sendet einen POST-Anforderungsaufruf zur angegebenen URL; das Ergebnis wird mit tap() abgefangen und an setSession() übermittelt
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:3001/auth/login', { username, password }).pipe(
		tap(authResult => this.setSession(authResult))
	  );
  }

  //Registrierung des Benutzers; Sendet einen POST-Anforderungsruf zur angegebenen URL; das Ergebnis wird mit tap() abgefangen und an setSession() übermittelt
  register(username: string, email: string, password: string, invitationCode: string): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:3001/auth/register', { username, email, password, invitationCode }).pipe(
		tap(authResult => this.setSession(authResult))
	  );
  }
  

  //private Methode, die die Benutzersitzung setzt, speichert den Token und das Ablaufdatum 
  private setSession(authResult: any): void {
	alert(authResult);
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  //Methode zum Ausloggen des Benutzers
  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  //Methode zur Überprüfung, ob Benutzer eingeloggt ist
  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  //Methode zur Überprüfung, ob Benutzer ausgeloggt ist
  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  //Methode, die das Ablaufdatum der Sitzung zurückgibt
  getExpiration(): moment.Moment {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
