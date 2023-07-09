import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router ) {}

  ngOnInit(): void {
    document.getElementById('togglePassword').addEventListener('click', () => this.togglePasswordVisibility());
  }

  ngOnDestroy(): void {
    // Hier kannst du Aufgaben durchführen, wenn die Komponente zerstört wird
  }

  // Funktion zum Ändern der Sichtbarkeit des Passworts
  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    const togglePassword = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Ändere das Icon, wenn das Passwort sichtbar ist
    } else {
      passwordInput.type = 'password';
      togglePassword.innerHTML = '<i class="fas fa-eye"></i>'; // Ändere das Icon, wenn das Passwort versteckt ist
    }
  }
  test():void{
	alert("test");
  }

  login(username: string, password:string ): void {
    this.authService.login(username, password).subscribe({
		next: (v) => {
			console.log(v);
			this.router.navigate(['/']);
		},
		error: (e) => console.error(e),
		complete: () => console.info('complete') 
	});

  }
}
