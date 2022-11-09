import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  
  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    return this.authService.verificarAutenticacion()
      .pipe(
        tap(isAuthentication => {
          if (!isAuthentication) {
            this.router.navigate(['./auth/login'])
          }
        })
      );
      /*if (this.authService.auth.id) {
        return true;
      }
    
    return false;*/
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
   
    return this.authService.verificarAutenticacion()
      .pipe(
      tap(isAuthentication => {
        if (!isAuthentication) {
          this.router.navigate(['./auth/login'])
        }
      })
    );
    /*if (this.authService.auth.id) {
      return true;
    }

    return false;*/
  }
}
