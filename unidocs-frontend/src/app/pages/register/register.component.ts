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
  styleUrl: './register.component.css',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  credentials = {
    nombre: '',
    apellidos: '',
    password: ''
  };

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  hasError = signal(false);
  userNameStatus = signal<'idle' | 'checking' | 'available' | 'taken'>('idle');

  // 👁️ Toggle de visibilidad de contraseña
  showPassword = signal(false);

  private checkTimeout: any;

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
    this.clearError();

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

  /**
   * Limpia el error en cuanto el usuario empieza a escribir.
   */
  onInputChange(): void {
    if (this.errorMessage()) {
      this.clearError();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.hasError.set(false);

    if (!this.credentials.nombre.trim() ||
        !this.credentials.apellidos.trim() ||
        !this.credentials.password) {
      this.triggerError('Por favor completa todos los campos');
      return;
    }

    if (this.credentials.password.length < 6) {
      this.triggerError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (this.credentials.nombre.trim().length < 3) {
      this.triggerError('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }

    if (this.userNameStatus() === 'taken') {
      this.triggerError('Este nombre de usuario ya está en uso');
      return;
    }

    this.isLoading.set(true);

    const payload = {
      userName: this.credentials.nombre.trim(),
      apellido: this.credentials.apellidos.trim(),
      password: this.credentials.password,
      rol: 'NUEVO_USUARIO'
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('¡Cuenta creada con éxito! Redirigiendo al login...');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.handleError(error);
      }
    });
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 0) {
      this.triggerError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else if (error.status === 409) {
      this.triggerError('Ya existe un usuario con ese nombre de usuario');
      this.userNameStatus.set('taken');
    } else if (error.status === 400) {
      const messages = error.error?.message;
      if (Array.isArray(messages)) {
        this.triggerError(messages.join(', '));
      } else {
        this.triggerError(messages || 'Datos inválidos');
      }
    } else if (error.status === 500) {
      this.triggerError('Error interno del servidor. Intenta nuevamente.');
    } else {
      const message = error.error?.message || error.message;
      this.triggerError(typeof message === 'string' ? message : 'Error al registrar usuario');
    }
  }

  /**
   * Activa el error y re-dispara la animación shake.
   */
  private triggerError(message: string): void {
    this.hasError.set(false);
    this.errorMessage.set('');
    setTimeout(() => {
      this.errorMessage.set(message);
      this.hasError.set(true);
    }, 50);
  }

  private clearError(): void {
    this.errorMessage.set('');
    this.hasError.set(false);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}

