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
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule
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
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,FormsModule,
  ReactiveFormsModule 
]

@NgModule({
  imports: [ materials ],
  exports: [ materials ]
})
export class MaterialModule { }
