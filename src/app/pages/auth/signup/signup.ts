import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

    username = '';
email = '';
password = '';
errorMessage = '';

constructor(
  private authService: AuthService,
  private router: Router
) {}


signup() {
  this.errorMessage = '';

  this.authService.signup({
    username: this.username,
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Signup failed';
    }
  });
}

  

}
