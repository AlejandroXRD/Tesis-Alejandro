// src/app/services/uploads.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type Category = 'graficos' | 'modelos' | 'planificacion';

export interface WorkspaceFile {
  name:       string;
  category:   Category;
  uploadedAt: string;   // ISO string
  sizeBytes:  number;
}

@Injectable({ providedIn: 'root' })
export class UploadsService {

  private readonly base = `${environment.apiUrl}/uploads`;

  constructor(private http: HttpClient) {}

  // ── Listar archivos de una categoría ──────────────────────────
  listFiles(category: Category): Observable<WorkspaceFile[]> {
    return this.http.get<WorkspaceFile[]>(`${this.base}/${category}`, {
      headers: this.authHeaders(),
    });
  }

  // ── Subir archivos ────────────────────────────────────────────
  uploadFiles(category: Category, files: File[]): Observable<WorkspaceFile[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));

    return this.http.post<WorkspaceFile[]>(`${this.base}/${category}`, formData, {
      headers: this.authHeaders(), // NO incluir Content-Type; el browser lo pone con boundary
    });
  }

  // ── Descargar archivo ─────────────────────────────────────────
  downloadFile(category: Category, filename: string): Observable<Blob> {
    return this.http.get(`${this.base}/${category}/${encodeURIComponent(filename)}`, {
      headers: this.authHeaders(),
      responseType: 'blob',
    });
  }

  // ── Eliminar archivo ──────────────────────────────────────────
  deleteFile(category: Category, filename: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.base}/${category}/${encodeURIComponent(filename)}`,
      { headers: this.authHeaders() },
    );
  }

  // ── Helper: headers con JWT ───────────────────────────────────
  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}