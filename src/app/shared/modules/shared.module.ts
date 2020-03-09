import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../../modules/admin/admin-routing.module';
import { MaterialModule } from "../material/material.module";

const sharedModules = [
  CommonModule,
  AdminRoutingModule,
  MaterialModule
]


@NgModule({
  declarations: [],
  imports: [ sharedModules ],
  exports: [ sharedModules ]
})
export class SharedModule { }
