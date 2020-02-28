import { AuthService } from './../../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { 
    this.loginForm = fb.group({
      userCode: ['admin'],
      password: ['1234']
    })
   }

  ngOnInit() {
  }

  onLogin() {
    if(this.auth.isAdminLoggedIn(this.loginForm)) {
      this.router.navigate(['/admin'])
    }
    
  }
}
