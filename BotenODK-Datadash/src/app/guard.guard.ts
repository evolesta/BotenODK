import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // check if token exists and is not expired
      const token = localStorage.getItem("token");
      if (token) {
        
        // token is set in localstorage
        const jwtHelper = new JwtHelperService();

        if (!jwtHelper.isTokenExpired(token)) {

          // token is stil valid
          return true;
        }
        else {
          // token is expired
          this.router.navigateByUrl("/");
          return false;
        }
      }
      else {
        // token isn't available or empty in localstorage
        this.router.navigateByUrl("/");
        return false;
      }
  }
  
}
