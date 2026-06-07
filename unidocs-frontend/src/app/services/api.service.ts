import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl.replace(/\/$/, '');

  constructor(private http: HttpClient) { }

  private normalize(endpoint: string): string {
    return `${this.apiUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.normalize(endpoint));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(this.normalize(endpoint), body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(this.normalize(endpoint), body);
  }

  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(this.normalize(endpoint), body);
  }

  delete<T = void>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.normalize(endpoint));
  }
}
