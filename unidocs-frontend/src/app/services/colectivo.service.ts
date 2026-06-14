import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

// ── Modelos ──
export interface Profesor {
  userId: string;
  userName: string;
  apellido: string;
  asignatura: string;
  rol: string;
}

export interface ProfessorAsignmentDto {
  profesorId: string;
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
  profesores?: ProfessorAsignmentDto[];
}

@Injectable({
  providedIn: 'root'
})
export class ColectivoService {
  private readonly colectivoURL = 'http://localhost:3000/colectivo';
  private readonly profesorURL = 'http://localhost:3000/user';

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  // 🛡️ Defensa en profundidad: garantiza que `profesores` siempre sea un array
  private normalizarColectivo = (c: Colectivo): Colectivo => ({
    ...c,
    profesores: c.profesores ?? []
  });

  // ── Consultas ──
  getAllColectivos(): Observable<Colectivo[]> {
    return this.http
      .get<Colectivo[]>(this.colectivoURL)
      .pipe(map(list => list.map(this.normalizarColectivo)));
  }

  getAllDiurno(): Observable<Colectivo[]> {
  return this.http
    .get<Colectivo[]>(`${this.colectivoURL}/diurno`)
    .pipe(
      switchMap(colectivos => 
        this.getAllProfesores().pipe(
          map(profesores => {
            // Mapa userId → datos del profesor
            const profMap = new Map(profesores.map(p => [p.userId, p]));
            
            // Enriquecer cada colectivo
            return colectivos.map(c => ({
              ...c,
              profesores: (c.profesores ?? []).map(p => ({
                ...p,
                userName: profMap.get(p.userId)?.userName ?? 'Sin nombre',
                apellido: profMap.get(p.userId)?.apellido ?? '',
                rol: profMap.get(p.userId)?.rol ?? ''
              }))
            }));
          })
        )
      ),
      map(list => list.map(c => this.normalizarColectivo(c)))
    );
}

  getAllEncuentro(): Observable<Colectivo[]> {
    return this.http
      .get<Colectivo[]>(`${this.colectivoURL}/encuentro`)
      .pipe(map(list => list.map(this.normalizarColectivo)));
  }

  getAllProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.profesorURL}/profesores`);
  }

  getColectivoById(id: string): Observable<Colectivo> {
    return this.apiService
      .get<Colectivo>(`/colectivo/${id}`)
      .pipe(map(this.normalizarColectivo));
  }

  // ── Mutaciones ──
  createColectivo(data: CreateColectivoRequest): Observable<Colectivo> {
    return this.apiService
      .post<Colectivo>('/colectivo', data)
      .pipe(map(this.normalizarColectivo));
  }

  updateColectivo(id: string, data: UpdateColectivoRequest): Observable<Colectivo> {
    return this.apiService
      .patch<Colectivo>(`/colectivo/${id}`, data)
      .pipe(map(this.normalizarColectivo));
  }

  deleteColectivo(id: string): Observable<void> {
    return this.apiService.delete<void>(`/colectivo/${id}`);
  }
}
