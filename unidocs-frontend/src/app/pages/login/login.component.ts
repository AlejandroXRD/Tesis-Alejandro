import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './login.component.css',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = {
    userName: '',
    password: ''
  };

  isLoading = signal(false);
  errorMessage = '';
  hasError = false;

  // 👁️ Control de visibilidad de la contraseña
  showPassword = false;

  ngOnInit(): void {
    this.credentials = { userName: '', password: '' };
    this.errorMessage = '';
    this.hasError = false;
    this.isLoading.set(false);
    this.showPassword = false;
  }

  /**
   * Limpia el error en cuanto el usuario empieza a escribir de nuevo.
   */
  onInputChange(): void {
    if (this.errorMessage) {
      this.errorMessage = '';
      this.hasError = false;
    }
  }

  /**
   * Alterna la visibilidad de la contraseña.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.credentials.userName || !this.credentials.password) {
      this.triggerError('Por favor completa todos los campos');
      return;
    }

    this.isLoading.set(true)
    this.clearError();

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response?.token) {
          this.authService.setToken(response.token);
        }
        if (response?.user) {
          this.authService.setUser(response.user);
        }
        this.isLoading.set(false)
        this.router.navigate(['/home']);
      },
      error: (error : any) => {
        
        console.log(error.error.message)
        const message = error.error.message
        this.isLoading.set(false)
        this.errorMessage = error.error.message
        // this.triggerError(message);
      }
    });
  }

  private triggerError(message: string): void {
    this.hasError = false;
    this.errorMessage = '';
    setTimeout(() => {
      this.errorMessage = message;
      this.hasError = true;
    }, 50);
  }

  private clearError(): void {
    this.errorMessage = '';
    this.hasError = false;
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
