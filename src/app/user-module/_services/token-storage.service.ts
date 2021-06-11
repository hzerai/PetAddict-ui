import { Injectable } from '@angular/core';
import { User } from '../User';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private cookieStore = {};
  constructor() {
    this.parseCookies(document.cookie);
   }

  public parseCookies(cookies = document.cookie) {
    this.cookieStore = {};
    if (!!cookies === false) { return; }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
        const cookieArr = cookie.split('=');
        this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  signOut(): void {
    document.cookie = `${TOKEN_KEY} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    document.cookie = `${USER_KEY} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  public saveToken(token: string): void {
    document.cookie = `${TOKEN_KEY} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    var now = new Date(),
    // this will set the expiration to 12 months
    exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
    document.cookie = `${TOKEN_KEY + '=' + (token || '')} ; expires=${exp}; path=/`;

  }

  public getToken(): string | null {
    this.parseCookies();
    return !!this.cookieStore[TOKEN_KEY] ? this.cookieStore[TOKEN_KEY] : null;
  }

  public saveUser(user: User): void {
    document.cookie = `${USER_KEY} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    var now = new Date(),
    // this will set the expiration to 12 months
    exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
    document.cookie = `${USER_KEY + '=' + (user || '')} ; expires=${exp}; path=/`;
  }

  public getUser(): User {
    this.parseCookies();
    return !!this.cookieStore[USER_KEY] ? this.cookieStore[USER_KEY] : null;
  }
}