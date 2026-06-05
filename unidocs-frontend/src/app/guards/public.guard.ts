import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // If user is already logged in, redirect to colectivos
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/colectivos']);
      return false;
    }

    // Otherwise, allow access to public pages
    return true;
  }
}
