import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../../services/user.store.service';
import { isValidPassword } from '../../../shared/utils/password.utils';

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
    private router: Router,
    private userStore: UserStoreService
  ) { }


  isPasswordValid(): boolean {
    return isValidPassword(this.password);
  }

  isFormValid(): boolean {
    return (
      this.username?.length > 0 &&
      this.email?.length > 0 &&
      this.isPasswordValid()
    );
  }


  signup() {
    this.errorMessage = '';

    this.authService.signup({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.userStore.setUser({
          username: this.username,
          email: this.email
        });

        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Signup failed';
      }
    });
  }
}