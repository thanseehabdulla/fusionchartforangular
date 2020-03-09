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

  getEmployees(): Observable<Employee[]> {
    return this.httpService.get('/employee')
      .pipe(map(response => {
        return response['payload'].employees;
      }))
  }

  getEmployee(employeeCode): Observable<EmployeeInfo> {
    return this.httpService.get(`/employee/${employeeCode}`)
      .pipe(map(response => {
        return response['payload'].employee;
      }))
  }

  getRoles(): Observable<Role[]> {
    return this.httpService.get('/role')
      .pipe(map(response => {
        return response['payload'].roles;
      }))
  }

  toggleActivation(employeeCode: string, status: string): Observable<any> {
    return this.httpService.patch(`/employee/activation/${employeeCode}`, { status: status })
      .pipe(
        map(response => {
          return response['payload'];
        })
      )
  }

  assignRole(employeeCode: string, roleId: number): Observable<any> {
    return this.httpService.post(`/employee`, { pki_user_code: employeeCode, status:'A', role_id: roleId, fki_company_id:1 });
  }

  changeRole(employeeCode: string, roleId: number): Observable<any> {
    return this.httpService.patch(`/employee/role/${employeeCode}`, { role_id: roleId });
  }

}