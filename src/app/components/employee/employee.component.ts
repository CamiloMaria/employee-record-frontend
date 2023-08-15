import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeResponse } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employee: Employee[] = [];
  page: number = 0;
  search: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService
      .getEmployees()
      .pipe(
        map((data: EmployeeResponse) => {
          return data.map((item: Employee) => {
            return {
              completeName: item.completeName,
              email: item.email,
              extension: item.extension,
              department: item.department,
              officeCode: item.officeCode,
            };
          });
        })
      )
      .subscribe({
        next: (employees: Employee[]) => {
          this.employee = employees;
        },
      });
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
