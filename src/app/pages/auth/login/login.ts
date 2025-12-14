import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';


  constructor(private authService: AuthService,private router:Router) { }


  login() {
    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
       this.router.navigate(['/']);
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
      },
      error: (err) => {
        console.log('Login failed',err);
      }
    })
  }

}
