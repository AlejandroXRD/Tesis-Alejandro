import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

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

  constructor(private api: ApiService) {}

  getReport(colectivoId: string): Observable<ReporteColectivo> {
    return this.api.get<ReporteColectivo>(`/reporte/${colectivoId}`);
  }
}