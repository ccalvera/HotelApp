import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validateToken();
  }

  validateToken() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['admin/login']);
      return false;
    }
    return true;
  }
}
