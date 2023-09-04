import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeResponse } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employee: Employee[] = [];
  page = 0;
  search: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService
      .getEmployees()
      .pipe(
        tap((data: EmployeeResponse) => {
          this.employee = data.map(({ completeName, email, extension, department, officeCode }) => ({
              completeName,
              email,
              extension,
              department,
              officeCode,
          }));
        }),
      catchError((error) => {
        console.log(error);
        alert('Error al cargar los empleados');
        return of([]);
      })
      )
      .subscribe();
  }

  onSearchChange(searchValue: string) {
    this.page = 0;
    this.search = searchValue;
  }

  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if (this.page > 0) {
      this.page -= 5;
    }
  }
}
