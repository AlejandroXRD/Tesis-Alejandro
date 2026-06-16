import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export type EstadoTarea = 'PENDIENTE' | 'EN_REVISION' | 'COMPLETADA' | 'RECHAZADA';

export interface Tarea {
  tareaId: string;
  nombreTarea: string;
  descripcion: string;
  fechaLimite: string;
  estado: EstadoTarea;
  userId: string;
  archivo: string | null;
  comentario?: string | null;
  revisorNombre?: string | null;
  updatedAt: string;
  profesor: {
    userId: string;
    userName: string;
    apellido: string;
  };
}

export interface CreateTareaRequest {
  nombreTarea: string;
  descripcion: string;
  fechaLimite: string;
  profesorId: string;
  estado?: EstadoTarea;
}

export interface UpdateTareaRequest {
  nombreTarea?: string;
  descripcion?: string;
  fechaLimite?: string;
  estado?: EstadoTarea;
  profesorId?: string;
  comentario?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  uploadArchivo(tareaId: string, file: File): Observable<Tarea> {
    const formData = new FormData();
    formData.append('archivo', file);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<Tarea>(
      `${this.apiUrl}/tarea/${tareaId}/upload`, formData, { headers }
    );
  }

  downloadArchivo(tareaId: string): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/tarea/${tareaId}/download`,
      { headers: this.getHeaders(), responseType: 'blob' }
    );
  }

  updateEstado(id: string, estado: EstadoTarea): Observable<Tarea> {
    return this.http.patch<Tarea>(
      `${this.apiUrl}/tarea/${id}`,
      { estado },
      { headers: this.getHeaders() }
    );
  }

  updateEstadoConComentario(
    id: string,
    estado: EstadoTarea,
    comentario: string
  ): Observable<Tarea> {
    return this.http.patch<Tarea>(
      `${this.apiUrl}/tarea/${id}`,
      { estado, comentario },
      { headers: this.getHeaders() }
    );
  }

  getAllTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(
      `${this.apiUrl}/tarea`, { headers: this.getHeaders() }
    );
  }

  getMisTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(
      `${this.apiUrl}/tarea/mis-tareas`, { headers: this.getHeaders() }
    );
  }

  getTareaById(id: string): Observable<Tarea> {
    return this.http.get<Tarea>(
      `${this.apiUrl}/tarea/${id}`, { headers: this.getHeaders() }
    );
  }

  createTarea(data: CreateTareaRequest): Observable<Tarea> {
    return this.http.post<Tarea>(
      `${this.apiUrl}/tarea`, data, { headers: this.getHeaders() }
    );
  }

  updateTarea(id: string, data: UpdateTareaRequest): Observable<Tarea> {
    return this.http.patch<Tarea>(
      `${this.apiUrl}/tarea/${id}`, data, { headers: this.getHeaders() }
    );
  }

  deleteTarea(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/tarea/${id}`, { headers: this.getHeaders() }
    );
  }
}