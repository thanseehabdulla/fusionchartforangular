import { NotifyService } from 'src/app/shared/services/notify.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;

  isUserExists: boolean;

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Current Password Form
    this.currentPasswordForm = this.fb.group({
      usercode: ['', Validators.required],
      currentPassword: ['', Validators.required]
    });

    // Reset Password Form
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.isUserExists = false;
  }

  // Verify the usercode and current password
  verifyUser() {
    this.authService.verifyUserCodeAndPassword(
      this.currentPasswordForm.get('usercode').value,
      this.currentPasswordForm.get('currentPassword').value)
      .subscribe(
        (data) => this.isUserExists = data.success,
        (error: Error) => this.notifyService.showError(error.message)
      )
  }

  // Reset password
  changePassword() {
    this.authService.changePassword(
      this.currentPasswordForm.get('usercode').value,
      this.currentPasswordForm.get('currentPassword').value,
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
