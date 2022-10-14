import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  private publicRoutes = [
    environment.apiurl + "/token"
  ];

  constructor(private http: HttpServiceService,
    private router: Router,
    private snackbar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // check if current url not matches with pulic routes
    if (!this.publicRoutes.includes(request.url)) {

      // check if the token has been set to the http service
      const token = localStorage.getItem("token");
      if (token) {

        const jwtHelper = new JwtHelperService();
        if (!jwtHelper.isTokenExpired(token)) {
          // add the authorization access token to the headers of the request
          request = request.clone({
            headers: request.headers.set(
              'Authorization', 'Bearer ' + token
            )
          });
        }
        else {
          // token is expired, return to login to obtain a new one
          this.router.navigateByUrl('/login');
          this.snackbar.open("Sessie verlopen - meld je opnieuw aan", "", {
            duration: 5000
          });
          return EMPTY;
        }
      }
      else {
        // token hasn't been set into the service, return to login
        this.router.navigateByUrl('/login');
        this.snackbar.open("Sessie verlopen - meld je opnieuw aan", "", {
          duration: 5000
        });
        return EMPTY;
      }
    }

    // return the (manipulated) request back
    return next.handle(request);
  }
}
