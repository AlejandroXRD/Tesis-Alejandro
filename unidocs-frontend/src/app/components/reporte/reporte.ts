import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColectivoService, Colectivo } from '../../services/colectivo.service';
import { ReporteService, ReporteColectivo } from '../../services/reporte.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

type Curso = 'DIURNO' | 'ENCUENTRO';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorModule],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css'
})
export class ReporteComponent implements OnInit {

  // ── Curso / lista ──
  cursoSeleccionado = signal<Curso | null>(null);
  anioFiltro = signal<number>(0);
  private colectivos = signal<Colectivo[]>([]);
  colectivoActivo = signal<Colectivo | null>(null);

  // ── Estado de carga ──
  cargandoColectivos = signal<boolean>(false);
  cargandoReporte = signal<boolean>(false);
  error = signal<string>('');

  // ── Reporte ──
  reporte = signal<ReporteColectivo | null>(null);

  // ── Acordeón de profesores (índice abierto) ──
  profesorAbierto = signal<number | null>(null);

  // ── Paginador ──
  first = signal<number>(0);
  rows = signal<number>(8);

  // ── Computed ──
  colectivosFiltrados = computed(() => {
    const curso = this.cursoSeleccionado();
    if (!curso) return [];
    let res = this.colectivos().filter(c => c.modalidad === curso);
    const anio = this.anioFiltro();
    if (anio !== 0) res = res.filter(c => c.year === anio);
    return res;
  });

  colectivosPaginados = computed(() => {
    const inicio = this.first();
    return this.colectivosFiltrados().slice(inicio, inicio + this.rows());
  });

  tareasResumen = computed(() => {
    const r = this.reporte();
    if (!r) return { total: 0, completadas: 0, pendientes: 0, vencidas: 0 };
    const tareas = r.profesores.flatMap(p => p.tareas);
    return {
      total: tareas.length,
      completadas: tareas.filter(t => t.estado === 'COMPLETADA').length,
      pendientes: tareas.filter(t => t.estado === 'PENDIENTE').length,
      vencidas: tareas.filter(t => t.estado === 'VENCIDA').length,
    };
  });

  constructor(
    private colectivoService: ColectivoService,
    private reporteService: ReporteService
  ) {}

  ngOnInit(): void {}

  // ── Selección de curso ──
  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado.set(curso);
    this.anioFiltro.set(0);
    this.first.set(0);
    this.colectivoActivo.set(null);
    this.reporte.set(null);
    this.error.set('');
    this.cargandoColectivos.set(true);

    const servicio$ = curso === 'DIURNO'
      ? this.colectivoService.getAllDiurno()
      : this.colectivoService.getAllEncuentro();

    servicio$.subscribe({
      next: (datos) => {
        this.colectivos.set(datos);
        this.cargandoColectivos.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los colectivos. Intente nuevamente.');
        this.cargandoColectivos.set(false);
      }
    });
  }

  volverASeleccion(): void {
    this.cursoSeleccionado.set(null);
    this.colectivoActivo.set(null);
    this.reporte.set(null);
    this.anioFiltro.set(0);
    this.error.set('');
  }

  seleccionarColectivo(colectivo: Colectivo): void {
    if (this.colectivoActivo()?.colectivoId === colectivo.colectivoId) return;
    this.colectivoActivo.set(colectivo);
    this.reporte.set(null);
    this.error.set('');
    this.profesorAbierto.set(null);
    this.cargarReporte(colectivo.colectivoId);
  }

  private cargarReporte(id: string): void {
    this.cargandoReporte.set(true);
    this.reporteService.getReport(id).subscribe({
      next: (data) => {
        this.reporte.set(data);
        this.cargandoReporte.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el reporte de este colectivo.');
        this.cargandoReporte.set(false);
      }
    });
  }

  filterByYear(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.anioFiltro.set(Number(target.value));
    this.first.set(0);
    const visible = this.colectivosFiltrados().some(c => c.colectivoId === this.colectivoActivo()?.colectivoId);
    if (!visible) {
      this.colectivoActivo.set(null);
      this.reporte.set(null);
    }
  }

  toggleProfesor(index: number): void {
    this.profesorAbierto.set(this.profesorAbierto() === index ? null : index);
  }

  onPageChange(event: PaginatorState): void {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 8);
  }

  exportarExcel(): void {
    // TODO: implementar exportación a Excel
    console.log('Exportar a Excel — próximamente');
  }

  estadoClass(estado: string): string {
    switch (estado) {
      case 'COMPLETADA': return 'badge--completada';
      case 'PENDIENTE':  return 'badge--pendiente';
      case 'VENCIDA':    return 'badge--vencida';
      default:           return 'badge--default';
    }
  }

  estadoLabel(estado: string): string {
    switch (estado) {
      case 'COMPLETADA': return 'Completada';
      case 'PENDIENTE':  return 'Pendiente';
      case 'VENCIDA':    return 'Vencida';
      default:           return estado;
    }
  }

  esFechaVencida(fecha: string): boolean {
    return new Date(fecha) < new Date();
  }
}