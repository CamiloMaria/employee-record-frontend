import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Admin, AdminResponse } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: string = ''
  endpoint = environment.backendApiUrl

  constructor(protected http: HttpClient) { 
    this.url = `${this.endpoint}/admin`
  }

  getAdmins(): Observable<AdminResponse> {
    return this.http.get<AdminResponse>(`${this.url}`)
  }

  createAdmin(admin: Admin): Observable<Admin> {
    const { _id, ...adminWithoutId } = admin;
    return this.http.post<Admin>(`${this.url}`, adminWithoutId)
  }

  updateAdmin(admin: Admin): Observable<Admin> {
    return this.http.patch<Admin>(`${this.url}/${admin._id}`, admin)
  }

  deleteAdmin(id: string): Observable<Admin> {
    return this.http.delete<Admin>(`${this.url}/${id}`)
  }
}
