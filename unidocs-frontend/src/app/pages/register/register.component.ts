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
  styleUrl: "./register.component.css",
  templateUrl: "./register.component.html"
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
