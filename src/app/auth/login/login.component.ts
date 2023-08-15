import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginFormValue } from 'src/app/models/login';
import { HttpErrorResponse } from '@angular/common/http';

enum ErrorStatus {
  IncorrectUsername = 401,
  IncorrectPassword = 402,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showError: string = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.loading) {
      return;
    }

    const { username, password } = this.loginForm.value as LoginFormValue;

    this.loading = true;
    this.loginService.login(username, password).pipe(
      catchError((errorConsole) => this.errorHandler(errorConsole)),
      finalize(() => this.loading = false)
    ).subscribe((response: LoginFormValue | null) => {
      if (response) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/admin']);
      }
    });
  }

  private errorHandler(errorConsole: HttpErrorResponse) {
    this.showError = errorConsole.error.error;

    switch (errorConsole.status) {
      case ErrorStatus.IncorrectUsername:
        this.toastr.error(this.showError, 'Incorrect username');
        break;
      case ErrorStatus.IncorrectPassword:
        this.toastr.error(this.showError, 'Incorrect password');
        break
      default:
        this.toastr.error(this.showError, 'Unexpected error');
        break;        
    }

    return of(null);
  }
}
