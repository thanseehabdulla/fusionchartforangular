import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/modules/shared.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../shared/material/material.module";
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    LoginComponent, 
    ForgotPasswordComponent, 
    ChangePasswordComponent, UserComponent,
  ],
  imports: [
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
