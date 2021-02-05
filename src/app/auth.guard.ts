import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,  Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { Covid19Service } from './covid19.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private covid19:Covid19Service, private router:Router ){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(! this.covid19.userSignedIn()){
      this.router.navigate(["signin"]);
    }
      return true;
  }
  
}
