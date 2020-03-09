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
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private employeeService: ManageEmployeesService
  ) {
    if (this.data.employee)
      this.employeeUpdateForm = this.fb.group({ 
        employeeCode: [{value: this.data.employee.pki_user_code, disabled: true}],
        role: [this.data.employee.role_id] });
    else
      this.employeeUpdateForm = this.fb.group({
        employeeCode: [{value:'', disabled: false}, Validators.required],
        role: ['', Validators.required] });
  }

  ngOnInit() {
    if(this.data.employee)
      this.getEmployeeDetails(this.data.employee.pki_user_code);
  }

  onUpdateRole() {
    if(this.data.employee) {
      if (this.data.employee.role_id !== this.employeeUpdateForm.get('role').value) {
        this.employeeService.changeRole(this.data.employee.pki_user_code, +this.employeeUpdateForm.get('role').value).subscribe(
          (data) => this.onCloseDialog(true),
          (error) => console.log(error));
      }
      else
        console.log('Please select a different role to update');
    }
    else {
      this.employeeService.assignRole(this.employeeUpdateForm.get('employeeCode').value, +this.employeeUpdateForm.get('role').value).subscribe(
        (data) => this.onCloseDialog(true),
        (error) => console.log(error));
    }
  }

  onCloseDialog(isChange: boolean) {
    this.dialogRef.close(isChange);
  }

  getEmployeeDetails(empCode: string) {
    this.employeeService.getEmployee(empCode).subscribe(
      (employeeInfo)=> this.employeeInfo = employeeInfo,
      (error)=> console.log(error));
  }

}
