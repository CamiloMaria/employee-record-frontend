import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginFormValue } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = '';
  endopoint = environment.backendApiUrl;

  constructor(protected http: HttpClient) { 
    this.url = `${this.endopoint}/auth/login `
  }

  login(username: string, password: string): Observable<LoginFormValue> {
    return this.http.post<LoginFormValue>(this.url, { username, password });
  }
}
