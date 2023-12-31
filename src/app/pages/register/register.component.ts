import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isFormValid: boolean = false;
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
  invitationCode: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    document.getElementById("togglePassword").addEventListener("click", () => this.togglePasswordVisibility());
  }

  // Prüft, ob alle Formularfelder ausgefüllt sind
  validateForm() {
    var username = (document.getElementById("username") as HTMLInputElement).value;
    var email = (document.getElementById("email") as HTMLInputElement).value;
    var password = (document.getElementById("passwordInput") as HTMLInputElement).value;
    var invitationCode = (document.getElementById("invitationCode") as HTMLInputElement).value;
    var agreeCheckbox = document.getElementById("customCheckRegister") as HTMLInputElement;
    var createAccountBtn = document.getElementById("createAccountBtn") as HTMLButtonElement;
  
    // Überprüfe, ob alle Felder ausgefüllt sind und das Kontrollkästchen angekreuzt ist
    this.isFormValid = username !== "" && email !== "" && password !== ""  && invitationCode !== "" && agreeCheckbox.checked;
  
    createAccountBtn.disabled = !this.isFormValid;
    console.log("CHeck Form valid: "+this.isFormValid);
    if (this.isFormValid) {
      console.log("in disabled");
      createAccountBtn.classList.remove("disabled");
    } else {
      createAccountBtn.classList.add("disabled");
    }
  }
  

  // Eventlistener hinzufügen, um das Formular bei Änderungen zu überprüfen
  ngAfterViewInit() {
    document.getElementById("username").addEventListener("input", () => this.validateForm());
    document.getElementById("email").addEventListener("input", () => this.validateForm());
    document.getElementById("passwordInput").addEventListener("input", () => this.validateForm());
    document.getElementById("invitationCode").addEventListener("input", () => this.validateForm());
    document.getElementById("customCheckRegister").addEventListener("change", () => this.validateForm());
  }

  //Methode zum Sichbarmachen des Passworts
  togglePasswordVisibility() {
    
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

  //Methode für die Registrierung
  register(username, email, password, invitationCode) : void{
    if (this.isFormValid){
    	this.authService.register(username, email, password, invitationCode).subscribe({
			next: (v) => {
				console.log(v);
				this.router.navigate(['/']);
			},
			error: (e) => console.error(e),
			complete: () => console.info('complete') 
		});
    }
  }
}
