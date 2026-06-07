import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Ajusta esto a tu URL del backend (sin slash final para evitar //auth/*)
  
  // Signals para el estado
  private isAuthenticatedSignal = signal<boolean>(this.hasToken());
  public isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ==================== MÉTODOS EXISTENTES ====================
  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSignal.set(true);
  }

  removeToken(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSignal.set(false);
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }

  // ==================== MÉTODOS DE AUTENTICACIÓN ====================
  /**
   * Login - Acepta payload completo o email + password
   * Compatible con login.component.ts
   */
  login(emailOrPayload: string | any, password?: string): Observable<any> {
    let payload;
    
    // Si recibe un objeto (payload completo)
    if (typeof emailOrPayload === 'object') {
      payload = emailOrPayload;
    } 
    // Si recibe string + string (email, password)
    else {
      payload = {
        email: emailOrPayload,
        password: password
      };
    }
    
    return this.http.post(`${this.apiUrl}/auth/login`, payload);
  }

  /**
   * Register - Acepta payload completo o email + password
   * Compatible con register.component.ts
   */
  
  register(emailOrPayload: string | any, password?: string): Observable<any> {
    let payload;
    
    // Si recibe un objeto (payload completo)
    if (typeof emailOrPayload === 'object') {
      payload = emailOrPayload;
    } 
    // Si recibe string + string (email, password)
    else {
      payload = {
        email: emailOrPayload,
        password: password
      };
    }
    return this.http.post(`${this.apiUrl}/auth/register`, payload);
  }

  /**
   * Logout
   * Limpia token, usuario y actualiza el estado
   */
  logout(): void {
    // Aquí puedes hacer una llamada al backend si lo necesitas
    // this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
    
    this.removeToken();
    this.removeUser();
    this.isAuthenticatedSignal.set(false);
  }

  // ==================== MÉTODOS AUXILIARES ====================
  hasToken(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSignal();
  }

  getUserEmail(): string {
    const user = this.getUser();
    return user?.email || '';
  }

  // ==================== VERIFICAR TOKEN ====================
  /**
   * Verifica si el token es válido con el backend (opcional)
   */
  verifyToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/verify`);
  }
}