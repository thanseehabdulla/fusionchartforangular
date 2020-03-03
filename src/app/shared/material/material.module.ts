import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatTabsModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from "@angular/material";

const materials = [
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatTabsModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
]

@NgModule({
  imports: [ materials ],
  exports: [ materials ]
})
export class MaterialModule { }
