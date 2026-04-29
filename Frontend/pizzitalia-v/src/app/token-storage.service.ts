import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'auth-role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser() {
    return sessionStorage.getItem(USER_KEY);
  }

  public saveRole(role: string) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }

  public getRole() {
    return sessionStorage.getItem(ROLE_KEY);
  }

  public isAdmin() {
    const role = this.getRole();
    return role === 'ROLE_ADMIN' || role === 'ROLE_SUPERADMIN';
  }

  public isUser() {
    return this.getRole() === 'ROLE_USER';
  }
}
