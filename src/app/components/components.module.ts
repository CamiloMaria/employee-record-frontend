import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import { FiltroPipeEmployee } from './pipes/filtroEmployee.pipe';
import { FiltroPipeAdmin } from './pipes/filtroAdmin.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [EmployeeComponent, AdminComponent, FiltroPipeEmployee, FiltroPipeAdmin],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatPaginatorModule,
  ],
})
export class ComponentsModule {}
