import { Injectable } from '@angular/core';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public dialog: MatDialog) { }

  confirmDialog(message,callback): void {
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      callback (dialogResult);
    });
  }
}
