import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface Tarea {
  tareaId: string;
  nombreTarea: string;
  descripcion: string;
  fechaLimite: string;
  estado: 'PENDIENTE' | 'EN_REVIsION' | 'RECHAZADA' | 'COMPLETADA';
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
  estado: 'PENDIENTE' | 'EN_REVIsION' | 'RECHAZADA' | 'COMPLETADA';
  profesorId: string;
}

export interface UpdateTareaRequest {
  nombreTarea?: string;
  descripcion?: string;
  fechaLimite?: string;
  estado?: 'PENDIENTE' | 'EN_REVIsION' | 'RECHAZADA' | 'COMPLETADA';
  profesorId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private apiService: ApiService) { }

  getAllTareas(): Observable<Tarea[]> {
    return this.apiService.get<Tarea[]>('/tarea');
  }

  getTareaById(id: string): Observable<Tarea> {
    return this.apiService.get<Tarea>(`/tarea/${id}`);
  }

  createTarea(data: CreateTareaRequest): Observable<Tarea> {
    return this.apiService.post<Tarea>('/tarea', data);
  }

  updateTarea(id: string, data: UpdateTareaRequest): Observable<Tarea> {
    return this.apiService.patch<Tarea>(`/tarea/${id}`, data);
  }

  deleteTarea(id: string): Observable<void> {
    return this.apiService.delete<void>(`/tarea/${id}`);
  }
}
