import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // ✅ CAMBIAR DE 'auth_token' A 'token'
    const token = localStorage.getItem('token');
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log('✅ Token encontrado y enviado');
    } else {
      console.warn('⚠️ Token NO encontrado');
    }

    return headers;
  }

  get<T>(endpoint: string): Observable<T> {
    const url = `${this.apiUrl}${endpoint}`;
    console.log(`📥 GET: ${url}`);
    
    return this.http.get<T>(url, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error(`❌ Error en GET ${endpoint}:`, error);
        return throwError(() => error);
      })
    );
  }

  patch<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.apiUrl}${endpoint}`;
    console.log(`🔧 PATCH: ${url}`, body);
    
    return this.http.patch<T>(url, body, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error(`❌ Error en PATCH ${endpoint}:`, error);
        return throwError(() => error);
      })
    );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.apiUrl}${endpoint}`;
    console.log(`📤 POST: ${url}`, body);
    
    return this.http.post<T>(url, body, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error(`❌ Error en POST ${endpoint}:`, error);
        return throwError(() => error);
      })
    );
  }

  delete<T>(endpoint: string): Observable<T> {
  const url = `${this.apiUrl}${endpoint}`;
  console.log(`🗑️ DELETE: ${url}`);
  
  return this.http.delete(url, { 
    headers: this.getHeaders(),
    responseType: 'text'          // ← acepta texto plano
  }).pipe(
    map(() => ({} as T)),         // ← convierte la respuesta a objeto vacío
    catchError(error => {
      console.error(`❌ Error en DELETE ${endpoint}:`, error);
      console.error(`❌ Status: ${error.status}`);
      console.error(`❌ Body:`, error.error);
      return throwError(() => error);
    })
  );
}
}