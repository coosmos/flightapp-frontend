import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logout } from '../shared/utils/auth.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.API}/signin`, data);
  }

  signup(data: { username: string; email: string; password: string }) {
  return this.http.post(`${this.API}/signup`, data);
}

}
