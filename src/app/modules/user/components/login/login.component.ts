import { NotifyService } from 'src/app/shared/services/notify.service';
import { AuthService } from './../../../../shared/services/auth.service';
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
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private notifyService: NotifyService) {
    // Login Form
    this.loginForm = fb.group({
      userCode: [''],
      password: ['']
    })
  }
  
  ngOnInit() {}

  // Login to the application
  onLogin() {
    this.authService.login(this.loginForm.get('userCode').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(
        (data: any) => this.router.navigate(['/admin/users']),
        (error: Error) => this.notifyService.showError(error.message))
  }
}
