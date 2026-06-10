import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <div class="app-shell">
      <app-navbar *ngIf="showNavbar"></app-navbar>

      <main class="main-content" [class.auth-page]="isAuthPage">
        <router-outlet />
      </main>

      <footer class="app-footer">
        <p>&copy; 2026 UniDocs. Todos los derechos reservados.</p>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      min-height: calc(100vh - 120px);
    }

    .main-content.auth-page {
      min-height: calc(100vh - 60px);
    }

    .app-footer {
      border-top: 1px solid var(--border-color);
      background: var(--bg-secondary);
      padding: 1rem;
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .app-footer p {
      margin: 0;
    }
  `]
})
export class App {
  private themeService = inject(ThemeService);
  private router = inject(Router);

  showNavbar = true;
  isAuthPage = false;

  constructor() {
    this.themeService.getTheme();

    this.updateLayoutForRoute(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateLayoutForRoute(event.urlAfterRedirects));
  }

  private updateLayoutForRoute(url: string): void {
    this.isAuthPage = url.startsWith('/login') || url.startsWith('/register');
    this.showNavbar = !this.isAuthPage;
  }
}
