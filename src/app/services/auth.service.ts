import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logout } from '../shared/utils/auth.util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) { }

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.API}/signin`, data);
  }

  signup(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.API}/signup`, data);
  }


  changeUsername(data: { newUsername: string }): Observable<any> {
    return this.http.put<any>(`${this.API}/user-profile`, data);
  }
  changePassword(data: { oldPassword: string; newPassword: string }): Observable<any> {
    return this.http.put<any>(`${this.API}/user-change-password`, data);
  }

}
