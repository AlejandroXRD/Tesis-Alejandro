import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: "./login.component.css",
  templateUrl: "./login.component.html"
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
