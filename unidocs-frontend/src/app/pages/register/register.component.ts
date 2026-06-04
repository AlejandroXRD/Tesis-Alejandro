import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Registrarse</h2>
        <p class="subtitle">Sistema de Gestión Documental UniDocs</p>

        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              [(ngModel)]="credentials.nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div class="form-group">
            <label for="apellidos">Apellidos</label>
            <input
              id="apellidos"
              type="text"
              [(ngModel)]="credentials.apellidos"
              name="apellidos"
              placeholder="Ingresa tus apellidos"
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
              placeholder="Crea una contraseña"
              required
            />
          </div>

          <button type="submit" class="btn-submit" [disabled]="isLoading">
            {{ isLoading ? 'Registrando...' : 'Crear cuenta' }}
          </button>

          <button type="button" class="btn-home" (click)="goHome()">
            Volver al Home
          </button>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div *ngIf="successMessage" class="success-message">
            {{ successMessage }}
          </div>
        </form>

        <div class="register-footer">
          <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 80px);
      padding: 2rem 1rem;
    }

    .register-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem;
      width: 100%;
      max-width: 420px;
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

    .success-message {
      color: #16a34a;
      font-size: 0.875rem;
      text-align: center;
    }

    .register-footer {
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
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = {
    nombre: '',
    apellidos: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  onSubmit(): void {
    if (!this.credentials.nombre || !this.credentials.apellidos || !this.credentials.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register({
      userName: this.credentials.nombre,
      apellido: this.credentials.apellidos,
      password: this.credentials.password,
      rol: 'PROFESOR'
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Registro completado con éxito';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Error al registrar usuario';
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
