import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private router: Router, private authService: AuthService) {}
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");
		console.log("idToken: "+ idToken);
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req).pipe(
				tap(
				  () => {},
				  (error) => {
					if (error.status === 401) {
					  // Benutzer ist nicht eingeloggt oder Session abgelaufen
					  this.authService.logout();
					  this.router.navigate(['/login']);
					}
				  }
				)
			  );;
        }
    }
}
