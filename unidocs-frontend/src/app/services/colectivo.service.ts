import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Profesor {
  userId: string;
  userName: string;
  apellido: string;
  asignatura: string;
}

export interface Colectivo {
  colectivoId: string;
  nombreColectivo: string;
  year: number;
  modalidad: 'DIURNO' | 'ENCUENTRO';
  createdAt: string;
  profesores?: Profesor[];
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

  constructor(private apiService: ApiService, private http : HttpClient) { }

  private colectivoURL : string = 'http://localhost:3000/colectivo'

  getAllColectivos(): Observable<Colectivo[]> {
    return this.http.get<Colectivo[]>(this.colectivoURL);
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
