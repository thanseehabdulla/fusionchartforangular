// service to manage admin/inspector details

import { apis } from 'src/app/config/api.config';
import { EmployeeInfo } from './../../../shared/models/employee-info';
import { Role } from './../../../shared/models/role';
import { HttpConnectionService } from './../../../shared/services/http-connection.service';
import { Employee } from './../../../shared/models/employee';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageEmployeesService {
  constructor(private httpService: HttpConnectionService) { }

  // GET: get all employees
  getEmployees(): Observable<Employee[]> {
    return this.httpService.get(apis.employees.employees)
      .pipe(map(response => {
        return response['payload'].employees;
      }))
  }

  // GET: get an employee details
  getEmployee(employeeCode): Observable<EmployeeInfo> {
    return this.httpService.get(`${apis.employees.employees}/${employeeCode}`)
      .pipe(map(response => {
        return response['payload'].employee;
      }))
  }

  // PATCH: Activate or Deactivate an employee
  toggleActivation(employeeCode: string, status: string): Observable<any> {
    return this.httpService.patch(`${apis.employees.activate_employee}/${employeeCode}`, { status: status })
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }

  //GET: get all roles
  getRoles(): Observable<Role[]> {
    return this.httpService.get(apis.employees.roles)
      .pipe(map(response => {
        return response['payload'].roles;
      }))
  }

  // POST: assign new role
  assignRole(employeeCode: string, roleId: number): Observable<any> {
    return this.httpService.post(apis.employees.employees, { pki_user_code: employeeCode, status:'A', role_id: roleId, fki_company_id:1 });
  }

  // PATCH: update role
  changeRole(employeeCode: string, roleId: number): Observable<any> {
    return this.httpService.patch(`${apis.employees.change_role}/${employeeCode}`, { role_id: roleId });
  }
}