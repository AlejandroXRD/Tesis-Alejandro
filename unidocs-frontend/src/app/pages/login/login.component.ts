import { Component, inject, OnInit } from '@angular/core';
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
              autocomplete="off"
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
              autocomplete="off"
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

          <div *ngIf="debugMessage" class="debug-message">
            {{ debugMessage }}
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
    }

    .login-card h2 {
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .login-card .subtitle {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      font-size: 0.875rem;
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
    }

    .form-group label {
      font-weight: 500;
      color: var(--text-primary);
    }

    .form-group input {
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }

    .form-group input:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
      outline: none;
    }

    .btn-submit,
    .btn-home {
      padding: 0.75rem;
      border-radius: 4px;
      font-weight: 600;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .btn-submit {
      background-color: var(--primary-color);
      color: white;
      border: none;
    }

    .btn-submit:hover:not(:disabled) {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-home {
      background-color: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
    }

    .btn-home:hover {
      background-color: var(--primary-color);
      color: white;
    }

    .error-message {
      color: var(--error-color);
      font-size: 0.875rem;
    }

    .debug-message {
      color: var(--info-color);
      font-size: 0.75rem;
      font-family: monospace;
      background: rgba(59, 130, 246, 0.1);
      padding: 0.5rem;
      border-radius: 4px;
    }

    .login-footer {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .login-footer a {
      color: var(--primary-color);
      font-weight: 600;
    }
  `]
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = {
    userName: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  debugMessage = '';

  ngOnInit(): void {
    // Evita que el componente reaproveche valores previos y limpia el formulario al entrar
    this.credentials = { userName: '', password: '' };
    this.errorMessage = '';
    this.debugMessage = '';
    this.isLoading = false;
  }

  onSubmit(): void {
  if (!this.credentials.userName || !this.credentials.password) {
    this.errorMessage = 'Por favor completa todos los campos';
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  console.log('📤 Enviando login:', this.credentials);

  this.authService.login(this.credentials).subscribe({
    next: (response) => {
      console.log('✅ Login response completa:', response);
      console.log('🔑 Token:', response?.token);
      console.log('👤 User:', response?.user);
      
      // ✅ SIEMPRE intentar guardar, no solo si existe
      if (response?.token) {
        this.authService.setToken(response.token);
      } else {
        console.warn('⚠️ No vino token en la respuesta del backend');
      }
      
      if (response?.user) {
        this.authService.setUser(response.user);
      }

      // Verificar que se guardó
      const tokenSaved = this.authService.getToken();
      console.log('🔍 Token guardado en localStorage:', tokenSaved);

      this.isLoading = false;

      // ✅ SIEMPRE navega a /home (ruta segura sin guard)
      // Si quieres ir a /colectivos, lo cambias después
      console.log('🚀 Navegando a /home...');
      this.router.navigate(['/home']);
    },
    error: (error) => {
      console.error('❌ Error en login:', error);
      this.isLoading = false;
      this.errorMessage = error.status === 401
        ? 'Usuario o contraseña incorrectos'
        : 'Error al iniciar sesión';
    }
  });
}

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
