import { MatDialog } from '@angular/material/dialog';
import { Role } from './../../../../../shared/models/role';
import { map } from 'rxjs/operators';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Employee } from './../../../../../shared/models/employee';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageEmployeesService } from '../../../services/manage-employees.service';
import { ManageEmployeesDailogComponent } from './manage-employees-dailog/manage-employees-dailog.component';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  allEmployees: MatTableDataSource<Employee>;
  filteredEmployees: MatTableDataSource<Employee>;
  pageLength: number;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  columns: string[] = ['pki_user_code', 'role_id', 'status', 'action'];
  displayColumns: string[] = ['Employee Code', 'Role', 'Status', 'Edit Role'];
  roles: Role[];
  headerForm: FormGroup;
  statusMapper = {
    'A': 'Active',
    'I': 'Inactive'
  }
  statusChangeMapper = {
    'A': 'I',
    'I': 'A'
  };
  statusMessageMapper = {
    'A': 'deactivate',
    'I': 'activate'
  }
  RoleMapper = {
    0: 'All',
    1: 'Admin',
    2: 'Inspector'
  }
  constructor(
    private employeeService: ManageEmployeesService,
    private helperService: HelperService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.headerForm = this.fb.group({
      search: [''],
      roles: [0]
    })
   }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.allEmployees = new MatTableDataSource(employees);
        this.filteredEmployees = new MatTableDataSource(employees);
        this.pageLength = this.filteredEmployees.data.length;
        this.filteredEmployees.sort = this.sort;
        this.filteredEmployees.paginator = this.paginator;
      },
      (error: Error) => console.log(error)
    );

    this.employeeService.getRoles().subscribe(
      (roles: Role[]) => this.roles = roles,
      (error: Error) => console.log(error)
    )
  }

  search(searchTerm: string) {
    this.filteredEmployees.filterPredicate = (employee: Employee, searchTerm: string) => {
      return employee['pki_user_code'].trim().toLowerCase().indexOf(searchTerm.trim().toLowerCase()) > -1;
    };
    this.filteredEmployees.filter = searchTerm;
  }

  onSelectRole(roleId: number) {
    this.filteredEmployees.data = this.allEmployees.data.filter((employee) => {
      if (roleId !== 0)
        return employee.role_id === roleId
      else
        return employee
    });
    this.pageLength = this.filteredEmployees.data.length;
  }

  toggleActivation(employeeCode: string, status: string) {
    let message = `Are you sure you want to ${this.statusMessageMapper[status]} the employee (Employee code: ${employeeCode}) `
    this.helperService.confirmDialog(message, (isConfirmed) => {
      if (isConfirmed) {
        this.employeeService.toggleActivation(employeeCode, this.statusChangeMapper[status])
          .subscribe(
            (data) => {
              this.employeeService.getEmployees().subscribe(
                (employees: Employee[]) => {
                  this.allEmployees.data = employees;
                  this.filteredEmployees.data = employees.filter((employee) => {
                    if (+this.headerForm.get('roles').value !== 0)
                      return employee.role_id === +this.headerForm.get('roles').value;
                    else
                      return employee;
                  });
                  this.pageLength = this.filteredEmployees.data.length;
                },
                (error: Error) => console.log(error)
              )
            },
            (error: Error) => console.log(error)
          )
      }
    })
  }

  openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(ManageEmployeesDailogComponent,
      { width: "30%", data: { employee: employee, roles: this.roles } }
    );

    dialogRef.afterClosed().subscribe(isChanged => {
      if (isChanged) {
        this.employeeService.getEmployees().subscribe((employees) => {
          this.allEmployees.data = employees;
          this.filteredEmployees.data = employees;
          this.pageLength = this.filteredEmployees.data.length;
          this.headerForm.get('roles').setValue(0);
          console.log(this.headerForm.get('roles').value)
        })
      }
    });
  }
}
