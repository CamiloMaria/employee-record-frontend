import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { EmployeeResponse } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSearchService {

  url: string = '';
  endopoint = environment.backendApiUrl;

  constructor(protected http: HttpClient) { 
    this.url = `${this.endopoint}/search`
  }

  searchEmployees(params: any): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.url}`, { params });
  }  
}
