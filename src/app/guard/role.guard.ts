import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GetAdminRoleService } from '../services/getAdminRole.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private getAdminRoleService: GetAdminRoleService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.checkRole(route);
    }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(childRoute, state);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkRole(route);
  }

  private checkRole(route: any): boolean {    
    const token = localStorage.getItem('token');
    const allowedRoles = route.data.allowedRoles as string[]; // Get allowed roles from route data

    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = this.getAdminRoleService.getAdminRole(token);

      if (userRole && allowedRoles.includes(userRole)) {
        return true; // Allow access to route
      }
    }

    return false; // Deny access to route
  }
}
