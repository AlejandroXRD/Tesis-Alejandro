import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

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
          <!-- Nombre de usuario con validación en tiempo real -->
          <div class="form-group">
            <label for="nombre">Nombre de usuario</label>
            <div class="input-wrapper">
              <input
                id="nombre"
                type="text"
                [(ngModel)]="credentials.nombre"
                name="nombre"
                placeholder="Ingresa tu nombre de usuario"
                required
                (ngModelChange)="onUserNameChange()"
                [class.input-error]="userNameStatus() === 'taken'"
                [class.input-success]="userNameStatus() === 'available'"
                [class.input-checking]="userNameStatus() === 'checking'"
              />
              <!-- ❌ ELIMINADA la palomita ✓ -->
              <!-- ✅ Solo queda el spinner de carga -->
              <span class="input-status" *ngIf="userNameStatus() as status">
                <span *ngIf="status === 'checking'" class="spinner-small"></span>
              </span>
            </div>
            <small 
              *ngIf="userNameStatus() === 'taken'" 
              class="field-error"
            >
              Este nombre de usuario ya está en uso
            </small>
            <small 
              *ngIf="userNameStatus() === 'available'" 
              class="field-success"
            >
              Nombre de usuario disponible
            </small>
          </div>

          <div class="form-group">
            <label for="apellidos">Apellido</label>
            <input
              id="apellidos"
              type="text"
              [(ngModel)]="credentials.apellidos"
              name="apellidos"
              placeholder="Ingresa tu apellido"
              required
            />
          </div>

          <div class="form-group">
            <label for="rol">Rol</label>
            <div class="select-wrapper">
              <select
                id="rol"
                [(ngModel)]="credentials.rol"
                name="rol"
                class="form-input"
                [class.input-error]="showError() && !credentials.rol"
                [class.has-value]="credentials.rol"
              >
                <option value="" disabled hidden>Seleccione su rol</option>
                <option *ngFor="let rol of rolOptions" [value]="rol.value">
                  {{ rol.label }}
                </option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
            <small 
              *ngIf="showError() && !credentials.rol" 
              class="field-error"
            >
              Por favor seleccione un rol
            </small>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              [(ngModel)]="credentials.password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              required
              minlength="6"
            />
            <small 
              *ngIf="credentials.password && credentials.password.length < 6" 
              class="field-error"
            >
              La contraseña debe tener al menos 6 caracteres
            </small>
          </div>

          <button 
            type="submit" 
            class="btn-submit" 
            [disabled]="isLoading() || userNameStatus() === 'taken'"
          >
            <span *ngIf="isLoading()" class="spinner"></span>
            {{ isLoading() ? 'Registrando...' : 'Crear cuenta' }}
          </button>

          <button type="button" class="btn-home" (click)="goHome()">
            Volver al Home
          </button>

          <div *ngIf="errorMessage()" class="error-message">
            {{ errorMessage() }}
          </div>

          <div *ngIf="successMessage()" class="success-message">
            {{ successMessage() }}
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
      text-align: center !important;
      margin: 0 auto !important;
    }

    .register-card h2 {
      margin-bottom: 0.5rem !important;
      color: var(--text-primary) !important;
      text-align: center !important;
      width: 100% !important;
    }

    .register-card .subtitle {
      color: var(--text-secondary) !important;
      margin-bottom: 2rem !important;
      font-size: 0.875rem !important;
      text-align: center !important;
      width: 100% !important;
    }

    form {
      display: flex !important;
      flex-direction: column !important;
      gap: 1rem !important;
      width: 100% !important;
    }

    .form-group {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.25rem !important;
      text-align: center !important;
      width: 100% !important;
      align-items: center !important;
    }

    .form-group label {
      font-weight: 500 !important;
      color: var(--text-primary) !important;
      font-size: 0.875rem !important;
      text-align: center !important;
      width: 100% !important;
      display: block !important;
    }

    .form-group input,
    .form-group select,
    .select-wrapper select,
    .input-wrapper input {
      padding: 0.75rem !important;
      border: 1px solid var(--border-color) !important;
      border-radius: 4px !important;
      background-color: var(--bg-primary) !important;
      color: var(--text-primary) !important;
      text-align: center !important;
      transition: all 0.2s !important;
      width: 100% !important;
      box-sizing: border-box !important;
      display: block !important;
    }

    .form-group input::placeholder,
    .input-wrapper input::placeholder {
      text-align: center !important;
      color: var(--text-secondary) !important;
      opacity: 1 !important;
    }

    .form-group input:focus::placeholder,
    .input-wrapper input:focus::placeholder {
      text-align: center !important;
    }

    .form-group input:focus,
    .form-group select:focus,
    .select-wrapper select:focus,
    .input-wrapper input:focus {
      border-color: var(--primary-color) !important;
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1) !important;
      outline: none !important;
    }

    .form-group input.input-error,
    .form-group select.input-error,
    .input-wrapper input.input-error,
    .select-wrapper select.input-error {
      border-color: #ef4444 !important;
    }

    .form-group input.input-error:focus,
    .form-group select.input-error:focus,
    .input-wrapper input.input-error:focus,
    .select-wrapper select.input-error:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }

    .form-group input.input-success,
    .input-wrapper input.input-success {
      border-color: #16a34a !important;
    }

    .form-group input.input-checking,
    .input-wrapper input.input-checking {
      border-color: #f59e0b !important;
    }

    .field-error {
      color: #ef4444 !important;
      font-size: 0.75rem !important;
      text-align: center !important;
      margin-top: 0.25rem !important;
      width: 100% !important;
      display: block !important;
    }

    .field-success {
      color: #16a34a !important;
      font-size: 0.75rem !important;
      text-align: center !important;
      margin-top: 0.25rem !important;
      width: 100% !important;
      display: block !important;
    }

    .input-wrapper {
      position: relative !important;
      width: 100% !important;
      display: block !important;
    }
    
    .input-wrapper .input-status {
      position: absolute !important;
      right: 0.75rem !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      display: flex !important;
      align-items: center !important;
      pointer-events: none !important;
    }
    
    .input-wrapper .input-status .spinner-small {
      display: inline-block !important;
    }

    .input-wrapper input {
      padding-right: 2.5rem !important;
    }

    .select-wrapper {
      position: relative !important;
      width: 100% !important;
      display: block !important;
    }

    .select-wrapper select {
      appearance: none !important;
      -webkit-appearance: none !important;
      -moz-appearance: none !important;
      width: 100% !important;
      padding: 0.75rem 2.5rem 0.75rem 0.75rem !important;
      border: 1px solid var(--border-color) !important;
      border-radius: 4px !important;
      background-color: var(--bg-primary) !important;
      color: var(--text-primary) !important;
      text-align: center !important;
      text-align-last: center !important;
      cursor: pointer !important;
      transition: all 0.2s !important;
      box-sizing: border-box !important;
      display: block !important;
    }

    .select-wrapper select:focus {
      border-color: var(--primary-color) !important;
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1) !important;
      outline: none !important;
    }

    .select-wrapper select:invalid,
    .select-wrapper select.ng-empty {
      color: var(--text-secondary) !important;
    }

    .select-wrapper select.has-value,
    .select-wrapper select.ng-valid:not(.ng-empty) {
      color: var(--text-primary) !important;
    }

    .select-wrapper .select-arrow {
      position: absolute !important;
      right: 0.75rem !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      pointer-events: none !important;
      color: var(--text-secondary) !important;
      font-size: 0.75rem !important;
    }

    .spinner-small {
      display: inline-block !important;
      width: 16px !important;
      height: 16px !important;
      border: 2px solid #f59e0b !important;
      border-top-color: transparent !important;
      border-radius: 50% !important;
      animation: spin 0.6s linear infinite !important;
    }

    .spinner {
      display: inline-block !important;
      width: 14px !important;
      height: 14px !important;
      border: 2px solid white !important;
      border-top-color: transparent !important;
      border-radius: 50% !important;
      animation: spin 0.6s linear infinite !important;
      margin-right: 0.5rem !important;
      vertical-align: middle !important;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .btn-submit,
    .btn-home {
      padding: 0.75rem !important;
      border-radius: 4px !important;
      font-weight: 600 !important;
      transition: all 0.3s ease !important;
      cursor: pointer !important;
      text-align: center !important;
      width: 100% !important;
      display: block !important;
      box-sizing: border-box !important;
    }

    .btn-submit {
      background-color: var(--primary-color) !important;
      color: white !important;
      border: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .btn-submit:hover:not(:disabled) {
      background-color: var(--primary-dark) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3) !important;
    }

    .btn-submit:disabled {
      opacity: 0.6 !important;
      cursor: not-allowed !important;
    }

    .btn-home {
      background-color: transparent !important;
      color: var(--primary-color) !important;
      border: 2px solid var(--primary-color) !important;
    }

    .btn-home:hover {
      background-color: var(--primary-color) !important;
      color: white !important;
    }

    .error-message {
      color: var(--error-color) !important;
      font-size: 0.875rem !important;
      text-align: center !important;
      padding: 0.5rem !important;
      background-color: rgba(239, 68, 68, 0.1) !important;
      border-radius: 4px !important;
      width: 100% !important;
      display: block !important;
      box-sizing: border-box !important;
    }

    .success-message {
      color: #16a34a !important;
      font-size: 0.875rem !important;
      text-align: center !important;
      padding: 0.5rem !important;
      background-color: rgba(34, 197, 94, 0.1) !important;
      border-radius: 4px !important;
      width: 100% !important;
      display: block !important;
      box-sizing: border-box !important;
    }

    .register-footer {
      text-align: center !important;
      margin-top: 1rem !important;
      font-size: 0.875rem !important;
      color: var(--text-secondary) !important;
      width: 100% !important;
      display: block !important;
    }

    .register-footer a {
      color: var(--primary-color) !important;
      font-weight: 600 !important;
    }

    .register-footer a:hover {
      text-decoration: underline !important;
    }
  `]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  credentials = {
    nombre: '',
    apellidos: '',
    password: '',
    rol: '' as '' | 'ADMIN' | 'PPA' | 'JEFE_COLECTIVO' | 'PROFESOR'
  };

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  showError = signal(false);
  userNameStatus = signal<'idle' | 'checking' | 'available' | 'taken'>('idle');

  private checkTimeout: any;

  rolOptions = [
    { value: 'PROFESOR', label: 'Profesor' },
    { value: 'JEFE_COLECTIVO', label: 'Jefe de Colectivo' },
    { value: 'PPA', label: 'PPA' },
    { value: 'ADMIN', label: 'Administrador' }
  ];

  onUserNameChange(): void {
    const userName = this.credentials.nombre.trim();
    
    if (this.checkTimeout) {
      clearTimeout(this.checkTimeout);
    }

    if (userName.length < 3) {
      this.userNameStatus.set('idle');
      return;
    }

    this.userNameStatus.set('checking');

    this.checkTimeout = setTimeout(() => {
      this.checkUserNameAvailability(userName);
    }, 500);
  }

  private checkUserNameAvailability(userName: string): void {
    this.http.get<{ available: boolean }>(`/api/user/check-username/${userName}`)
      .subscribe({
        next: (response) => {
          this.userNameStatus.set(response.available ? 'available' : 'taken');
        },
        error: () => {
          this.userNameStatus.set('idle');
        }
      });
  }

  onSubmit(): void {
    this.showError.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!this.credentials.nombre.trim() || 
        !this.credentials.apellidos.trim() || 
        !this.credentials.password ||
        !this.credentials.rol) {
      this.errorMessage.set('Por favor completa todos los campos');
      return;
    }

    if (this.credentials.password.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (this.credentials.nombre.trim().length < 3) {
      this.errorMessage.set('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }

    if (this.userNameStatus() === 'taken') {
      this.errorMessage.set('Este nombre de usuario ya está en uso');
      return;
    }

    this.isLoading.set(true);

    const payload = {
      userName: this.credentials.nombre.trim(),
      apellido: this.credentials.apellidos.trim(),
      password: this.credentials.password,
      rol: this.credentials.rol as 'ADMIN' | 'PPA' | 'JEFE_COLECTIVO' | 'PROFESOR'
    };

    console.log('📤 Enviando registro:', payload);

    this.authService.register(payload).subscribe({
      next: (response) => {
        console.log('✅ Registro exitoso:', response);

        // Flujo requerido: registrar y luego ir a login (sin autologin)
        this.isLoading.set(false);
        this.successMessage.set('¡Cuenta creada con éxito! Redirigiendo al login...');
        this.errorMessage.set('');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Error en el registro:', error);
        this.isLoading.set(false);
        this.handleError(error);
      }
    });
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 0) {
      this.errorMessage.set('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else if (error.status === 409) {
      this.errorMessage.set('Ya existe un usuario con ese nombre de usuario');
      this.userNameStatus.set('taken');
    } else if (error.status === 400) {
      const messages = error.error?.message;
      if (Array.isArray(messages)) {
        this.errorMessage.set(messages.join(', '));
      } else {
        this.errorMessage.set(messages || 'Datos inválidos');
      }
    } else if (error.status === 500) {
      this.errorMessage.set('Error interno del servidor. Intenta nuevamente.');
    } else {
      const message = error.error?.message || error.message;
      this.errorMessage.set(typeof message === 'string' ? message : 'Error al registrar usuario');
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
