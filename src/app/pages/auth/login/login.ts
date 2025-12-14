import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';


  constructor(private authService: AuthService,private router:Router) { }

  errorMessage:string='';
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
        if(err.status===403){
          this.errorMessage='Invalid username or password';
        }else{
          this.errorMessage='Something went wrong. Please try again later';
        }
        
      }
    })
  }

}
