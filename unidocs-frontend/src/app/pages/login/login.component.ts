import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Iniciar Sesión</h2>
        <p class="subtitle">Sistema de Gestión Documental UniDocs</p>

        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="userName">Usuario</label>
            <input
              id="userName"
              type="text"
              [(ngModel)]="credentials.userName"
              name="userName"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              [(ngModel)]="credentials.password"
              name="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button type="submit" class="btn-submit" [disabled]="isLoading">
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>

          <button type="button" class="btn-home" (click)="goHome()">
            Volver al Home
          </button>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>

        <div class="login-footer">
          <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 80px);
      padding: 2rem 1rem;
    }

    .login-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;

      h2 {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
        text-align: center;
      }

      .subtitle {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        font-size: 0.875rem;
        text-align: center;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;

      label {
        font-weight: 500;
        color: var(--text-primary);
        text-align: center;
      }

      input {
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background-color: var(--bg-primary);
        color: var(--text-primary);
        text-align: center;

        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }
      }
    }

    .btn-submit,
    .btn-home {
      padding: 0.75rem;
      border-radius: 4px;
      font-weight: 600;
      transition: all 0.3s ease;
      text-align: center;
      cursor: pointer;
    }

    .btn-submit {
      background-color: var(--primary-color);
      color: white;

      &:hover:not(:disabled) {
        background-color: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .btn-home {
      background-color: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);

      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
    }

    .error-message {
      color: var(--error-color);
      font-size: 0.875rem;
      text-align: center;
    }

    .login-footer {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary);

      a {
        color: var(--primary-color);
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = {
    userName: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (!this.credentials.userName || !this.credentials.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.access_token) {
          this.authService.setToken(response.access_token);
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Error al iniciar sesión';
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
