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
      'required': 'Employee Code is required!'
    },
    'password': {
      'required': 'Password is required!'
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifyService: NotifyService) {
    // Login Form
    this.loginForm = this.fb.group({
      usercode: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() { }

  // Login to the application
  onLogin() {
    this.authService.login(this.loginForm.get('usercode').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe((data: any) => this.router.navigate(['/admin/users']))
  }
}
