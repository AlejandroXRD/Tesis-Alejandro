import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  styleUrl: "./home.component.css",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  goToColectivos(): void {
    this.router.navigate(['/colectivos']);
  }

  // ✨ NUEVO: Navegar al espacio de trabajo
  goToWorkspace(): void {
    this.router.navigate(['/espacio-trabajo']);
  }
}