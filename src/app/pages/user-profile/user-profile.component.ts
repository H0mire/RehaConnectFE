import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("togglePassword").addEventListener("click", () => this.togglePasswordVisibility());
  }

  //Methode für die Sichtbarkeit des Passwortes
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
}
