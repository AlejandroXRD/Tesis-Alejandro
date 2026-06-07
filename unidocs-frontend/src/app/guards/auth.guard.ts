import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();
    console.log('🛡️ AuthGuard - intentando acceder a:', state.url);
    console.log('🛡️ AuthGuard - token en localStorage:', token);

    if (this.authService.isLoggedIn()) {
      console.log('✅ AuthGuard - acceso permitido');
      return true;
    }

    console.log('❌ AuthGuard - sin token, redirigiendo a /login');
    this.router.navigate(['/login']);
    return false;
  }
}
