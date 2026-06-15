import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  
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
  login(emailOrPayload: string | any, password?: string): Observable<any> {
    let payload;
    
    if (typeof emailOrPayload === 'object') {
      payload = emailOrPayload;
    } else {
      payload = {
        email: emailOrPayload,
        password: password
      };
    }
    
    return this.http.post(`${this.apiUrl}/auth/login`, payload);
  }

  register(emailOrPayload: string | any, password?: string): Observable<any> {
    let payload;
    
    if (typeof emailOrPayload === 'object') {
      payload = emailOrPayload;
    } else {
      payload = {
        email: emailOrPayload,
        password: password
      };
    }
    return this.http.post(`${this.apiUrl}/auth/register`, payload);
  }

  logout(): void {
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

  // ==================== ✨ NUEVOS MÉTODOS PARA ESPACIO-TRABAJO ====================
  /**
   * Obtiene el usuario actual desde localStorage
   * (Alias de getUser() para compatibilidad con espacio-trabajo)
   */
  getCurrentUser(): any {
    return this.getUser();
  }

  /**
   * Obtiene el rol del usuario actual
   */
  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }

  // ==================== VERIFICAR TOKEN ====================
  verifyToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/verify`);
  }
}