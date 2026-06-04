import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface Colectivo {
  colectivoId: string;
  nombreColectivo: string;
  year: number;
  modalidad: 'DIURNO' | 'ENCUENTRO';
  createdAt: string;
}

export interface CreateColectivoRequest {
  nombreColectivo: string;
  year: number;
  modalidad: 'DIURNO' | 'ENCUENTRO';
}

export interface UpdateColectivoRequest {
  nombreColectivo?: string;
  year?: number;
  modalidad?: 'DIURNO' | 'ENCUENTRO';
}

@Injectable({
  providedIn: 'root'
})
export class ColectivoService {

  constructor(private apiService: ApiService) { }

  getAllColectivos(): Observable<Colectivo[]> {
    return this.apiService.get<Colectivo[]>('/colectivo');
  }

  getColectivoById(id: string): Observable<Colectivo> {
    return this.apiService.get<Colectivo>(`/colectivo/${id}`);
  }

  createColectivo(data: CreateColectivoRequest): Observable<Colectivo> {
    return this.apiService.post<Colectivo>('/colectivo', data);
  }

  updateColectivo(id: string, data: UpdateColectivoRequest): Observable<Colectivo> {
    return this.apiService.patch<Colectivo>(`/colectivo/${id}`, data);
  }

  deleteColectivo(id: string): Observable<void> {
    return this.apiService.delete<void>(`/colectivo/${id}`);
  }
}
