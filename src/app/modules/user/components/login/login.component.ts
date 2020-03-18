// page to handle login

import { MyErrorStateMatcher } from 'src/app/shared/validators/ErrorStateManager';
import { Validators } from '@angular/forms';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  validationMessages = {
    'usercode': {
      'required': 'Employee Code is required!',
      'maxlength': 'Employee Code should not exceed 20 characters!'
    },
    'password': {
      'required': 'Password is required!',
      'maxlength': 'Password must be less than 20 characters!'
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    // Login Form
    this.loginForm = this.fb.group({
      usercode: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  ngOnInit() { }

  // Login to the application
  onLogin() {
    this.authService.login(this.loginForm.get('usercode').value.trim(), this.loginForm.get('password').value.trim())
      .pipe(first())
      .subscribe((data: any) => this.router.navigate(['/admin/users']))
  }
}
