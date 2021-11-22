import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private accountService: AccountService) { };
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accountService.userValue) {
      this.router.navigate(['/admin/home']);
      return false
    }
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.accountService.userValue) {
      this.router.navigate(['/admin/home']);
      return false
    }
    return true;
  }

}
