import { Injectable } from '@angular/core';
import { CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckUserAuthService } from './shared/check-user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate{
  constructor(private userAuth: CheckUserAuthService,
              private router: Router
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userAuth.isUserLogin()){
      return true
    } else {
      this.router.navigate(['login'])
    }
  }
}
