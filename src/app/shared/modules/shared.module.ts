import { UserRoutingModule } from './../../modules/user/user-routing.module';
import { NoWhiteSpaceDirective } from './../directives/no-white-space.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../../modules/admin/admin-routing.module';
import { MaterialModule } from "../material/material.module";

const sharedModules = [
  CommonModule,
  MaterialModule
]


@NgModule({
  declarations: [NoWhiteSpaceDirective],
  imports: [sharedModules],
  exports: [sharedModules, NoWhiteSpaceDirective]
})
export class SharedModule { }
