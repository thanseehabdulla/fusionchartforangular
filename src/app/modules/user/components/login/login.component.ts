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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { 
    this.loginForm = fb.group({
      userCode: ['admin'],
      password: ['1234']
    })
   }

  ngOnInit() {
  }

  onLogin() {
        this.authService.login(this.loginForm.get('userCode').value,this.loginForm.get('password').value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/admin/users']);
              },
              error => {
                  console.log(error);
              });
  }
}
