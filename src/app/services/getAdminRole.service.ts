import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAdminRoleService {
  getAdminRole(token: string | null): string | null {
    if (token) {
      try{
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        
        return decodedToken.role;
      } catch (error) {
        console.error('error decoding token:', error);
        return null;
      }
    }
    else {
      return null;
    }
  }
}
