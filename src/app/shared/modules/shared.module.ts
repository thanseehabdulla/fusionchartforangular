// module to share common modules, directive, components etc

import { NoWhiteSpaceDirective } from './../directives/no-white-space.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
