import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  theme = this.themeService.getTheme();
  isDarkMode = computed(() => this.theme() === 'dark');
  isAuthenticated = this.authService.isAuthenticated;

  isMenuOpen = false;
  isNavbarHidden = signal(false);
  isLoggingOut = signal(false);

  // Usuario logueado (de localStorage, cargado en login.component.ts)
  loggedUser = computed(() => this.authService.getUser());

  private lastScrollY = 0;
  private scrollThreshold = 50;

  ngOnInit(): void {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  private handleScroll(): void {
    const currentScrollY = window.scrollY;

    // Solo ocultar la navbar después de desplazarse más de 50px
    if (currentScrollY > this.scrollThreshold) {
      // Si estamos scrolleando hacia abajo
      if (currentScrollY > this.lastScrollY) {
        this.isNavbarHidden.set(true);
      }
      // Si estamos scrolleando hacia arriba
      else {
        this.isNavbarHidden.set(false);
      }
    } else {
      // Cerca del top, siempre mostrar
      this.isNavbarHidden.set(false);
    }

    this.lastScrollY = currentScrollY;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // ==================== LOGOUT ====================
  handleLogout(): void {
    this.isLoggingOut.set(true);

    // Limpieza inmediata para evitar que guards/login-register vean el token aún presente
    this.authService.logout();

    // Mantener el modal 2 segundos (UX), pero ya estamos logueados-out.
    setTimeout(() => {
      this.isLoggingOut.set(false);
      this.closeMenu();
      this.router.navigate(['/']);
    }, 2000);
  }
}
