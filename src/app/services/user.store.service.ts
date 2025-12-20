import { Injectable } from '@angular/core';

export interface UserInfo {
  username: string;
  email: string;
}
@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private USER_KEY = 'user_info';
  setUser(user: UserInfo) {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  getUser(): UserInfo | null {
    const data = sessionStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }
  getEmail(): string | null {
    return this.getUser()?.email ?? null;
  }
  clear() {
    sessionStorage.removeItem(this.USER_KEY);
  }
}
