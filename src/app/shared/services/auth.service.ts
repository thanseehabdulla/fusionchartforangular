import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAdminLoggedIn(loginForm: FormGroup) {
    if(loginForm.get('userCode').value === 'admin' && loginForm.get('password').value === '1234') {
      return true;
    }
    else {
      return false;
    }
  }
}
