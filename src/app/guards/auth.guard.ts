import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      console.warn("🔴 Accès refusé : l'utilisateur n'est pas connecté.");
      this.router.navigate(['/login']);
      return false;
    }

    const role = this.authService.getUserRole();
    console.log("👤 Rôle détecté :", role);

    if (state.url.includes('/admin-dashboard') && role !== 'ROLE_ADMIN') {
      console.warn("⛔ Accès refusé : rôle ADMIN requis.");
      this.router.navigate(['/user-dashboard']);
      return false;
    }

    if (state.url.includes('/user-dashboard') && role !== 'ROLE_USER') {
      console.warn("⛔ Accès refusé : rôle USER requis.");
      this.router.navigate(['/admin-dashboard']);
      return false;
    }

    return true;
  }
}
