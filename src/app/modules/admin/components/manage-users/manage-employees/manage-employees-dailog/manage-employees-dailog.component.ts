import { NotifyService } from 'src/app/shared/services/notify.service';
import { EmployeeInfo } from './../../../../../../shared/models/employee-info';
import { Validators } from '@angular/forms';
import { ManageEmployeesService } from './../../../../services/manage-employees.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-manage-employees-dailog',
  templateUrl: './manage-employees-dailog.component.html',
  styleUrls: ['./manage-employees-dailog.component.scss']
})

export class ManageEmployeesDailogComponent implements OnInit {
  employeeInfo: EmployeeInfo;
  employeeUpdateForm: FormGroup;
  employeeInfoColumns: string[] = ['name', 'place', 'designation'];
  employeeInfoDisplayColumns: string[] = ['Name', 'Place', 'Designation'];

  statusMapper = {
    'A': 'Active',
    'I': 'Inactive'
  }
  RoleMapper = {
    0: 'All',
    1: 'Admin',
    2: 'Inspector'
  }

  constructor(
    private dialogRef: MatDialogRef<ManageEmployeesDailogComponent>,
    private fb: FormBuilder,
    private employeeService: ManageEmployeesService,
    private notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    if (this.data.employee)
      this.employeeUpdateForm = this.fb.group({
        employeeCode: [{ value: this.data.employee.pki_user_code, disabled: true }],
        role: [this.data.employee.role_id]
      });
    else
      this.employeeUpdateForm = this.fb.group({
        employeeCode: [{ value: '', disabled: false }, Validators.required],
        role: ['', Validators.required]
      });
  }

  ngOnInit() {
    if (this.data.employee)
      this.getEmployeeDetails(this.data.employee.pki_user_code);
  }

  onUpdateRole() {
    if (this.data.employee) {
      if (this.data.employee.role_id !== this.employeeUpdateForm.get('role').value) {
        this.employeeService.changeRole(this.data.employee.pki_user_code, +this.employeeUpdateForm.get('role').value).subscribe(
          (data: any) => this.onCloseDialog(true),
          (error: Error) => this.notifyService.showError(error.message));
      }
      else
        this.notifyService.showInfo(`Please select a different role. The employee is already an ${this.RoleMapper[this.data.employee.role_id]}`);
    }
    else {
      this.employeeService.assignRole(this.employeeUpdateForm.get('employeeCode').value, +this.employeeUpdateForm.get('role').value).subscribe(
        (data: any) => this.onCloseDialog(true),
        (error: Error) => this.notifyService.showError(error.message));
    }
  }

  getEmployeeDetails(empCode: string) {
    this.employeeService.getEmployee(empCode).subscribe(
      (employeeInfo: EmployeeInfo) => this.employeeInfo = employeeInfo,
      (error: Error) => this.notifyService.showError(error.message));
  }

  onCloseDialog(isChange: boolean) {
    this.dialogRef.close(isChange);
  }
}
