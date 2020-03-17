import { MyErrorStateMatcher } from 'src/app/shared/validators/ErrorStateManager';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { EmployeeInfo } from 'src/app/shared/models/employee-info';
import { Validators, FormControl } from '@angular/forms';
import { ManageEmployeesService } from 'src/app/modules/admin/services/manage-employees.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { noWhitespaceValidator } from 'src/app/shared/validators/CustomValidators';

@Component({
  selector: 'app-manage-employees-dailog',
  templateUrl: './manage-employees-dailog.component.html',
  styleUrls: ['./manage-employees-dailog.component.scss']
})

export class ManageEmployeesDailogComponent implements OnInit {

  employeeInfo: EmployeeInfo;
  employeeUpdateForm: FormGroup;
  employeeInfoColumns: string[] = ['name', 'place', 'designation'];
  isEdit: boolean = true;

  statusMapper = {
    'A': 'Active',
    'I': 'Inactive'
  }
  RoleMapper = {
    0: 'All',
    1: 'Admin',
    2: 'Inspector'
  }

  matcher = new MyErrorStateMatcher();
  validationMessages = {
    'employeeCode': {
      'required': 'Employee Code is required!',
      'maxlength': 'Employee Code should not exceed 20 characters!'
    },
    'role': {
      'required': 'Role must be selected!'
    }
  }

  constructor(
    private dialogRef: MatDialogRef<ManageEmployeesDailogComponent>,
    private fb: FormBuilder,
    private employeeService: ManageEmployeesService,
    private notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.employee) {
      // "Edit" form to change role
      this.employeeUpdateForm = this.fb.group({
        employeeCode: [{ value: this.data.employee.pki_user_code, disabled: true }],
        role: [this.data.employee.role_id]
      });
    }
    else {
      // "Add" form to assign new role
      this.employeeUpdateForm = this.fb.group({
        employeeCode: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(20)]],
        role: ['', Validators.required]
      });
    }
  }

  ngOnInit() {
    // Fetch employee details of an employee
    if (this.data.employee)
      this.getEmployeeDetails(this.data.employee.pki_user_code);
  }

  // Update role of an employee
  onUpdateRole() {
    if (this.employeeInfo.role_id !== this.employeeUpdateForm.get('role').value.trim()) {
      if (this.isEdit === true) {
        this.employeeService.changeRole(
          this.employeeUpdateForm.get('employeeCode').value.trim(),
          +this.employeeUpdateForm.get('role').value.trim())
          .subscribe((data: any) => this.onCloseDialog(true));
      }
      else {
        this.employeeService.assignRole(
          this.employeeUpdateForm.get('employeeCode').value.trim(), 
          +this.employeeUpdateForm.get('role').value.trim())
          .subscribe((data: any) => this.onCloseDialog(true));
      }
    }
    else
      this.notifyService.showInfo(`Please select a different role. The employee is already an ${this.RoleMapper[this.employeeInfo.role_id]}`);
  }

  // Fetch employee details of an employee
  getEmployeeDetails(empCode: string) {
    if (empCode) {
      this.employeeService.getEmployee(empCode)
        .subscribe(
          (employeeInfo: EmployeeInfo) => {
            this.employeeInfo = employeeInfo;
            this.employeeUpdateForm.get('role').setValue(this.employeeInfo.role_id);
            if (this.employeeInfo.role_id)
              this.isEdit = true;
            else
              this.isEdit = false;
          },
          (error) => {
            this.employeeInfo = null;
          }
        );
    }
  }

  // Close dialog
  onCloseDialog(isChange: boolean) {
    this.dialogRef.close({ empCode: this.employeeInfo ? this.employeeInfo['pki_user_code'] : '', isChange: isChange });
  }
}
