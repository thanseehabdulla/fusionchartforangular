import { User } from './../../../../shared/models/user';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  userVerificationForm: FormGroup;
  otpVerificationForm: FormGroup;
  resetPasswordForm: FormGroup;

  isUserExists: boolean;
  isOtpVerified: boolean;
  userInfo: User;

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private fb: FormBuilder
  ) {
    this.userVerificationForm = this.fb.group({ usercode: ['', Validators.required] });
    this.otpVerificationForm = this.fb.group({ otp: ['', Validators.required] });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.isUserExists = false;
    this.isOtpVerified = false;
  }

  verifyUser() {
    this.authService.verifyUserCode(this.userVerificationForm.get('usercode').value)
      .subscribe(
        (data) => {
          this.isUserExists = data.success;
          this.userInfo = data.user
        },
        (error: Error) => this.notifyService.showError(error.message)
      )
  }

  verifyOTP() {
    this.authService.verifyOTP(this.otpVerificationForm.get('otp').value)
      .subscribe(
        (data) => this.isOtpVerified = data.success,
        (error: Error) => this.notifyService.showError(error.message)
      )
  }

  forgotPassword() {
    this.authService.forgotPassword(
      this.userVerificationForm.get('usercode').value,
      this.resetPasswordForm.get('newPassword').value,
      this.resetPasswordForm.get('confirmPassword').value)
      .subscribe(
        (data) => {
          this.notifyService.showSuccess("Password is changed successfully! Please login to the application");
          this.authService.logout();
        },
        (error: Error) => this.notifyService.showError(error.message)
      )
  }

}
