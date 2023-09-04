import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Employee, EmployeeResponse } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = '';
  endopoint = environment.backendApiUrl;

  constructor(protected http: HttpClient) { 
    this.url = `${this.endopoint}/employee`
  }

  getEmployees(): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.url}`)
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const { _id, ...employeeWithoutId } = employee;
    return this.http.post<Employee>(this.url, employeeWithoutId);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${this.url}/${employee._id}`, employee)
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`)
  }
}
