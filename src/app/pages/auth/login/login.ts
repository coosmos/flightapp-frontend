import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../../services/user.store.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';


  constructor(private authService: AuthService,private router:Router,private userStore:UserStoreService) { }

  errorMessage:string='';
  login() {
  this.authService.login({
    username: this.username,
    password: this.password
  }).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);

      this.userStore.setUser({
        username: response.username,
        email: response.email
      });

      this.router.navigate(['/']);
    },
    error: (err) => {
      this.errorMessage =
        err.status === 403
          ? 'Invalid username or password'
          : 'Something went wrong';
    }
  });
}
}