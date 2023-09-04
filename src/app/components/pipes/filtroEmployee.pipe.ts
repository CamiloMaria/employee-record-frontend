import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Pipe({
  name: 'filtroEmployee',
})
export class FiltroPipeEmployee implements PipeTransform {
  transform(
    employees: Employee[],
    page: number = 0,
    search: string = ''
  ): Employee[] {
    const filteredEmployees = employees.filter((employee) => {
      return (
        employee.completeName.toLowerCase().includes(search.toLowerCase()) ||
        employee.extension.toString().includes(search) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase()) ||
        employee.officeCode.toLowerCase().includes(search.toLowerCase())
      );
    });

    return filteredEmployees.slice(page, page + 5);
  }
}
