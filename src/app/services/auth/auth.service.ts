import { Injectable } from '@angular/core';
import { dataAccount } from '../../_constant/account';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(username: string, password: string): boolean {

    const bytes = CryptoJS.AES.decrypt(dataAccount.password, "");
    const pass = bytes.toString(CryptoJS.enc.Utf8);

    if (password === pass) {
      localStorage.setItem("isLogin", "x");
    }

    return true;
  }

  logout(): void {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("employees");
  }
}
