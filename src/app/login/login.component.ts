import { Component } from '@angular/core';
import { GoogleAuthService } from '../services/google-auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private googleAuthService: GoogleAuthService) {}

  login() {
    this.googleAuthService.loginWithGoogle();
  }
  
}
