import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { OfficeResponse } from '../models/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  url: string = '';
  endopoint = environment.officesApiUrl;

  constructor(protected http: HttpClient) { 
    this.url = `${this.endopoint}`
  }
  
  getOffices(): Observable<OfficeResponse> {
    return this.http.get<OfficeResponse>(this.url);
  }
}
