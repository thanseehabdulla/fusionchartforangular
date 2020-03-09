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
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  MatDialogModule,
  FormsModule,
  ReactiveFormsModule, 
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule
]

@NgModule({
  imports: [ materials ],
  exports: [ materials ]
})
export class MaterialModule { }
