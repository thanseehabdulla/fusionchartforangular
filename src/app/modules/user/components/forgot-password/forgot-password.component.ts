import { MyErrorStateMatcher } from 'src/app/shared/validators/ErrorStateManager';
import { User } from 'src/app/shared/models/user';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomValidators } from "src/app/shared/validators/CustomValidators";

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

  matcher = new MyErrorStateMatcher();
  validationMessages = {
    'usercode': {
      'required': 'Employee Code is required!'
    },
    'otp': {
      'required': 'OTP is required!'
    },
    'newPassword': {
      'required': 'Password is required!',
      'minlength': 'Password must have minimum of 8 characters!'
    },
    'confirmPassword': {
      'required': 'Password is required!'
    }
  }

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private fb: FormBuilder
  ) {
    this.userVerificationForm = this.fb.group({ usercode: ['', Validators.required] });
    this.otpVerificationForm = this.fb.group({ otp: ['', Validators.required] });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: CustomValidators.confirmPassword })
  }

  ngOnInit() {
    this.isUserExists = true;
    this.isOtpVerified = true;
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
