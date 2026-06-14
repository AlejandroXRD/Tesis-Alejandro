import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TareaReporte {
  nombreTarea: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

export interface ProfesorReporte {
  nombre: string;
  apellido: string;
  rol: string;
  asignatura: string;
  tareas: TareaReporte[];
}

export interface ColectivoInfo {
  nombre: string;
  año: number;
  modalidad: string;
  cantidadProfesores: number;
}

export interface ReporteColectivo {
  colectivo: ColectivoInfo;
  profesores: ProfesorReporte[];
}

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private readonly apiUrl = `http://localhost:3000/reporte`;

  constructor(private http: HttpClient) {}

  getReport(colectivoId: string): Observable<ReporteColectivo> {
    return this.http.get<ReporteColectivo>(`${this.apiUrl}/${colectivoId}`);
  }
}