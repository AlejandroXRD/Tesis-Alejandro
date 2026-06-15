import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
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

  constructor(private apiService: ApiService) {}

  // 🛡️ Defensa en profundidad: garantiza que `profesores` siempre sea un array
  private normalizarColectivo = (c: Colectivo): Colectivo => ({
    ...c,
    profesores: c.profesores ?? []
  });

  // ── Consultas Públicas (para admin/jefe/decano) ──
  getAllColectivos(): Observable<Colectivo[]> {
    return this.apiService
      .get<Colectivo[]>('/colectivo')
      .pipe(map(list => list.map(this.normalizarColectivo)));
  }

  getAllDiurno(): Observable<Colectivo[]> {
    return this.apiService
      .get<Colectivo[]>('/colectivo/diurno')
      .pipe(
        switchMap(colectivos =>
          this.getAllProfesores().pipe(
            map(profesores => {
              const profMap = new Map(profesores.map(p => [p.userId, p]));
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
    return this.apiService
      .get<Colectivo[]>('/colectivo/encuentro')
      .pipe(map(list => list.map(this.normalizarColectivo)));
  }

  // ── Consultas Privadas (para usuarios normales - mis colectivos) ──

  /**
   * Obtiene TODOS los colectivos del usuario actual.
   * Requiere autenticación JWT.
   * Endpoint: GET /colectivo/usuario/mis-colectivos
   */
  getMisColectivos(): Observable<any> {
    return this.apiService
      .get<any>('/colectivo/usuario/mis-colectivos')
      .pipe(
        switchMap(respuesta =>
          this.getAllProfesores().pipe(
            map(profesores => {
              const profMap = new Map(profesores.map(p => [p.userId, p]));
              const colectivosEnriquecidos = (respuesta.colectivos ?? []).map((c: any) => ({
                ...c,
                profesores: (c.profesores ?? []).map((p: any) => ({
                  ...p,
                  userName: profMap.get(p.userId)?.userName ?? 'Sin nombre',
                  apellido: profMap.get(p.userId)?.apellido ?? '',
                  rol: profMap.get(p.userId)?.rol ?? ''
                }))
              }));
              return { ...respuesta, colectivos: colectivosEnriquecidos };
            })
          )
        ),
        map(respuesta => ({
          ...respuesta,
          colectivos: (respuesta.colectivos ?? []).map(this.normalizarColectivo)
        }))
      );
  }

  /**
   * Obtiene los colectivos DIURNO del usuario actual.
   * Requiere autenticación JWT.
   * Endpoint: GET /colectivo/usuario/mis-colectivos/DIURNO
   */
  getMisColectivosDiurno(): Observable<any> {
    return this.apiService
      .get<any>('/colectivo/usuario/mis-colectivos/DIURNO')
      .pipe(
        switchMap(respuesta =>
          this.getAllProfesores().pipe(
            map(profesores => {
              const profMap = new Map(profesores.map(p => [p.userId, p]));
              const colectivosEnriquecidos = (respuesta.colectivos ?? []).map((c: any) => ({
                ...c,
                profesores: (c.profesores ?? []).map((p: any) => ({
                  ...p,
                  userName: profMap.get(p.userId)?.userName ?? 'Sin nombre',
                  apellido: profMap.get(p.userId)?.apellido ?? '',
                  rol: profMap.get(p.userId)?.rol ?? ''
                }))
              }));
              return { ...respuesta, colectivos: colectivosEnriquecidos };
            })
          )
        ),
        map(respuesta => ({
          ...respuesta,
          colectivos: (respuesta.colectivos ?? []).map(this.normalizarColectivo)
        }))
      );
  }

  /**
   * Obtiene los colectivos ENCUENTRO del usuario actual.
   * Requiere autenticación JWT.
   * Endpoint: GET /colectivo/usuario/mis-colectivos/ENCUENTRO
   */
  getMisColectivosEncuentro(): Observable<any> {
    return this.apiService
      .get<any>('/colectivo/usuario/mis-colectivos/ENCUENTRO')
      .pipe(
        switchMap(respuesta =>
          this.getAllProfesores().pipe(
            map(profesores => {
              const profMap = new Map(profesores.map(p => [p.userId, p]));
              const colectivosEnriquecidos = (respuesta.colectivos ?? []).map((c: any) => ({
                ...c,
                profesores: (c.profesores ?? []).map((p: any) => ({
                  ...p,
                  userName: profMap.get(p.userId)?.userName ?? 'Sin nombre',
                  apellido: profMap.get(p.userId)?.apellido ?? '',
                  rol: profMap.get(p.userId)?.rol ?? ''
                }))
              }));
              return { ...respuesta, colectivos: colectivosEnriquecidos };
            })
          )
        ),
        map(respuesta => ({
          ...respuesta,
          colectivos: (respuesta.colectivos ?? []).map(this.normalizarColectivo)
        }))
      );
  }

  getAllProfesores(): Observable<Profesor[]> {
    return this.apiService.get<Profesor[]>('/user/profesores');
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
    return this.apiService.patch<Colectivo>(`/colectivo/${id}`, data);
  }

  deleteColectivo(id: string): Observable<void> {
    return this.apiService.delete<void>(`/colectivo/${id}`);
  }
}