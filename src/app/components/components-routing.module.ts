import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
// import { LoginGuard } from '../guard/login.guard';
import { RoleGuard } from '../guard/role.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [LoginGuard, RoleGuard],
    // data: { allowedRoles: ['admin', 'subAdmin'] },
    // canActivateChild: [LoginGuard],
    // canLoad: [RoleGuard],
  },
  {
    path: '', component: EmployeeComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
