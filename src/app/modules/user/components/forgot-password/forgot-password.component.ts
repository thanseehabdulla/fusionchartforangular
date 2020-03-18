// page to handle forgot password

import { MyErrorStateMatcher } from 'src/app/shared/validators/ErrorStateManager';
import { User } from 'src/app/shared/models/user';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Validators, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { confirmPasswordValidator } from "src/app/shared/validators/CustomValidators";
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  userVerificationForm: FormGroup;
  otpVerificationForm: FormGroup;
  resetPasswordForm: FormGroup;

  isUserExists: boolean;
  isOtpVerified: boolean;
  userInfo: User;
  userInfoColumns: string[] = ['name', 'place', 'designation'];

  matcher = new MyErrorStateMatcher();
  validationMessages = {
    'usercode': {
      'required': 'Employee Code is required!',
      'maxlength': 'Employee Code should not exceed 20 characters!'
    },
    'otp': {
      'required': 'OTP is required!',
      'maxlength': 'OTP should not exceed 8 characters!'
    },
    'newPassword': {
      'required': 'Password is required!',
      'minlength': 'Password must have minimum of 6 characters!',
      'maxlength': 'Password should not exceed 20 characters!'
    },
    'confirmPassword': {
      'required': 'Password is required!',
      'passwordMismatch': 'Password mismatch!'
    }
  }

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // User verification form
    this.userVerificationForm = this.fb.group({
      usercode: ['', [Validators.required, Validators.maxLength(20)]]
    });
    // OTP verification form
    this.otpVerificationForm = this.fb.group({ otp: ['', [Validators.required, Validators.maxLength(6)]] });
    // Reset password form
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required]
    }, { validator: confirmPasswordValidator })
  }

  ngOnInit() {
    this.isUserExists = false;
    this.isOtpVerified = false;
  }

  // Verify user code
  verifyUser() {
    this.authService.verifyUserCode(this.userVerificationForm.get('usercode').value.trim())
      .subscribe(
        (data: any) => {
          this.isUserExists = true;
          this.userInfo = data;
          this.userVerificationForm.get('usercode').disable();
        },
        (error: Error) => {
          this.isUserExists = false;
        }
      )
  }

  // Generate OTP
  generateOTP() {
    this.authService.generateOTP(this.userVerificationForm.get('usercode').value.trim()).subscribe(
      (data) => this.notifyService.showSuccess("OTP sent successfully!"),
      (error) => this.stepper.previous()
    );
  }

  // Validate OTP
  verifyOTP() {
    this.authService.verifyOTP(
      this.userVerificationForm.get('usercode').value.trim(),
      this.otpVerificationForm.get('otp').value.trim())
      .subscribe(
        (data: any) => {
          this.isOtpVerified = true;
          this.otpVerificationForm.get('otp').disable();
          this.notifyService.showSuccess("OTP matched successfully!");
        },
        (error: Error) => {
          this.isOtpVerified = false;
        }
      )
  }

  // Reset password
  forgotPassword() {
    this.authService.forgotPassword(
      this.userVerificationForm.get('usercode').value.trim(),
      this.resetPasswordForm.get('newPassword').value.trim(),
      this.resetPasswordForm.get('confirmPassword').value.trim())
      .subscribe(
        (data: any) => {
          this.notifyService.showSuccess("Password is changed successfully! Please login to the application");
          this.authService.logout();
        });
  }
}
