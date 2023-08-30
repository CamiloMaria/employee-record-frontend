import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { Admin, AdminResponse } from 'src/app/models/admin';
import { Employee, EmployeeResponse } from 'src/app/models/employee';
import { AdminService } from 'src/app/services/admin.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Office } from 'src/app/models/office';
import { OfficeService } from 'src/app/services/office.service';
import { GetAdminRoleService } from 'src/app/services/getAdminRole.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('createEmployeeModal') createEmployeeModalRef!: ElementRef;
  @ViewChild('editEmployeeModal') editEmployeeModalRef!: ElementRef;
  @ViewChild('createAdminModal') createAdminModalRef!: ElementRef;
  @ViewChild('editAdminModal') editAdminModalRef!: ElementRef;
  @ViewChild('changePasswordModal') changePasswordModalRef!: ElementRef;

  offices: Office[] = [];

  selectedEmployee: Employee;
  selectedEmployeeEmpty: Employee;
  //employeeForm: FormGroup;

  employees: Employee[] = [];
  search: string = '';
  page: number = 0;

  showEmployees = true;
  showAdmins = false;

  admins: Admin[] = [];
  selectedAdmin: Admin;
  selectedAdminEmpty: Admin;
  //adminForm: FormGroup;
  roleOptions: string[] = ['admin', 'subAdmin'];

  isAdmin: boolean = false;
  isSubAdmin: boolean = false;

  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private getAdminRoleService: GetAdminRoleService,
    private adminService: AdminService,
    private employeeService: EmployeeService,
    private officeService: OfficeService,
    // private formBuilder: FormBuilder,
    private renderer: Renderer2
  ) {
    this.selectedEmployeeEmpty = {
      _id: '',
      completeName: '',
      email: '',
      extension: 0,
      department: '',
      officeCode: '',
    };

    this.selectedEmployee = {
      _id: '',
      completeName: '',
      email: '',
      extension: 0,
      department: '',
      officeCode: '',
    };

    this.selectedAdminEmpty = {
      _id: '',
      username: '',
      password: '',
      role: '',
      created_at: new Date(),
    };

    this.selectedAdmin = {
      _id: '',
      username: '',
      password: '',
      role: '',
      created_at: new Date(),
    };

    // this.employeeForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   email: ['', Validators.required],
    //   extension: ['', Validators.required],
    //   department: ['', Validators.required],
    //   officeCode: ['', Validators.required],
    // });

    // this.adminForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    //   role: ['', Validators.required],
    // });
  }
  ngOnInit(): void {
    this.getAdminRole();
    this.loadEmployees();
  }

  //Get Admin Role
  getAdminRole() {
    const token = localStorage.getItem('token');
    const adminRole = this.getAdminRoleService.getAdminRole(token);
    if (adminRole === 'admin') {
      this.isAdmin = true;
      this.isSubAdmin = false;
    } else if (adminRole === 'subAdmin') {
      this.isAdmin = false;
      this.isSubAdmin = true;
    } else {
      this.isAdmin = false;
      this.isSubAdmin = false;
    }
  }

  //Offices---
  loadOffices() {
    this.officeService.getOffices().subscribe({
      next: (response: any) => {
        const offices = response.rows.map((item: Office) => {
          return {
            id: item.id,
            pl: item.pl,
            nombre: item.nombre,
            estatus: item.estatus,
          };
        });
        this.offices = offices;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  //Employees---
  loadEmployees() {
    this.employeeService
      .getEmployees()
      .pipe(
        map((data: EmployeeResponse) => {
          return data.map((item: Employee) => {
            return {
              _id: item._id,
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
          this.employees = employees;
        },
      });
    this.loadOffices();
  }

  createEmployee() {
    const selectedOffice = this.offices.find(
      (office) => office.pl === this.selectedEmployee.officeCode
    );

    if (selectedOffice) {
      this.selectedEmployee.officeCode = selectedOffice.pl;
    } else {
      console.log('No se encontro la oficina');
    }

    this.employeeService.createEmployee(this.selectedEmployee).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeCreateEmployeeModal();
      },
    });

    window.location.reload();
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.selectedEmployee).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeEditEmployeeModal();
      },
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
      });
    }
  }
  //---!

  //Admins---
  loadAdmins() {
    this.adminService
      .getAdmins()
      .pipe(
        map((data: AdminResponse) => {
          return data.map((item: Admin) => {
            return {
              _id: item._id,
              username: item.username,
              password: item.password,
              role: item.role,
              created_at: item.created_at,
            };
          });
        })
      )
      .subscribe({
        next: (admins: Admin[]) => {
          this.admins = admins;
        },
      });
  }

  createAdmin() {
    this.adminService.createAdmin(this.selectedAdmin).subscribe({
      next: () => {
        this.loadAdmins();
        this.closeCreateAdminModal();
      },
    });
  }

  updateAdmin() {
    this.adminService.updateAdmin(this.selectedAdmin).subscribe({
      next: () => {
        this.loadAdmins();
        this.closeEditAdminModal();
      },
    });
  }

  deleteAdmin(id: string) {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.loadAdmins();
        },
      });
    }
  }
  //---!

  // Modal---

  // Employees
  openCreateEmployeeModal() {
    this.selectedEmployee = this.selectedEmployeeEmpty;
    this.renderer.removeClass(
      this.createEmployeeModalRef.nativeElement,
      'close'
    );
    this.renderer.addClass(this.createEmployeeModalRef.nativeElement, 'show');
    this.renderer.setStyle(
      this.createEmployeeModalRef.nativeElement,
      'display',
      'block'
    );
  }

  openEditEmployeeModal(employee: Employee) {
    this.selectedEmployee = employee;
    this.renderer.removeClass(this.editEmployeeModalRef.nativeElement, 'close');
    this.renderer.addClass(this.editEmployeeModalRef.nativeElement, 'show');
    this.renderer.setStyle(
      this.editEmployeeModalRef.nativeElement,
      'display',
      'block'
    );
  }

  closeCreateEmployeeModal() {
    this.renderer.addClass(this.createEmployeeModalRef.nativeElement, 'close');
    this.renderer.setStyle(
      this.createEmployeeModalRef.nativeElement,
      'display',
      'none'
    );
  }

  closeEditEmployeeModal() {
    this.renderer.addClass(this.editEmployeeModalRef.nativeElement, 'close');
    this.renderer.setStyle(
      this.editEmployeeModalRef.nativeElement,
      'display',
      'none'
    );
  }

  // Admins
  openCreateAdminModal() {
    this.selectedAdmin = this.selectedAdminEmpty;
    this.renderer.removeClass(this.createAdminModalRef.nativeElement, 'close');
    this.renderer.addClass(this.createAdminModalRef.nativeElement, 'show');
    this.renderer.setStyle(
      this.createAdminModalRef.nativeElement,
      'display',
      'block'
    );
  }

  openEditAdminModal(admin: Admin) {
    this.selectedAdmin = admin;
    this.renderer.removeClass(this.editAdminModalRef.nativeElement, 'close');
    this.renderer.addClass(this.editAdminModalRef.nativeElement, 'show');
    this.renderer.setStyle(
      this.editAdminModalRef.nativeElement,
      'display',
      'block'
    );
  }

  closeCreateAdminModal() {
    this.renderer.addClass(this.createAdminModalRef.nativeElement, 'close');
    this.renderer.setStyle(
      this.createAdminModalRef.nativeElement,
      'display',
      'none'
    );
  }

  closeEditAdminModal() {
    this.renderer.addClass(this.editAdminModalRef.nativeElement, 'close');
    this.renderer.setStyle(
      this.editAdminModalRef.nativeElement,
      'display',
      'none'
    );
  }

  openChangePasswordModal() {
    this.renderer.removeClass(
      this.changePasswordModalRef.nativeElement,
      'close'
    );
    this.renderer.addClass(this.changePasswordModalRef.nativeElement, 'show');
    this.renderer.setStyle(
      this.changePasswordModalRef.nativeElement,
      'display',
      'block'
    );
  }

  closeChangePasswordModal() {
    this.renderer.addClass(this.changePasswordModalRef.nativeElement, 'close');
    this.renderer.setStyle(
      this.changePasswordModalRef.nativeElement,
      'display',
      'none'
    );

    this.newPassword = '';
    this.confirmNewPassword = '';
  }

  changePassword() {
    if (
      !this.selectedAdmin.password ||
      !this.newPassword ||
      !this.confirmNewPassword
    ) {
      // Si alguno de los campos está vacío, mostrar un mensaje de error
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verificar que las nuevas contraseñas coinciden
    if (this.newPassword !== this.confirmNewPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }

    // Actualizar la contraseña hasheada en selectedAdmin
    this.selectedAdmin.password = this.newPassword;
    this.closeChangePasswordModal();
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

  logout() {
    localStorage.removeItem('token');

    window.location.reload();
  }
}
