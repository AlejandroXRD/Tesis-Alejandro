import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColectivoService, Colectivo } from '../../services/colectivo.service';
import { ReporteService, ReporteColectivo } from '../../services/reporte.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import * as XLSX from 'xlsx';

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
    const reporte = this.reporte();
    if (!reporte) return;

    const resumen = this.tareasResumen();
    const workbook = XLSX.utils.book_new();

    // ═══════════════════════════════════════════════
    // HOJA 1 — Resumen del colectivo
    // ═══════════════════════════════════════════════
    const filasResumen: (string | number)[][] = [
      ['REPORTE DE COLECTIVO ACADÉMICO'],
      [reporte.colectivo.nombre],
      [`Generado el ${new Date().toLocaleDateString('es-ES', { dateStyle: 'long' })}`],
      [],
      ['DATOS DEL COLECTIVO', ''],
      ['Nombre del colectivo',    reporte.colectivo.nombre],
      ['Año académico',           `${reporte.colectivo.año}° año`],
      ['Modalidad',               reporte.colectivo.modalidad === 'DIURNO' ? 'Diurno' : 'Por Encuentros'],
      ['Cantidad de profesores',  reporte.colectivo.cantidadProfesores],
      [],
      ['RESUMEN DE TAREAS', ''],
      ['Total de tareas',   resumen.total],
      ['Completadas',       resumen.completadas],
      ['Pendientes',        resumen.pendientes],
      ['Vencidas',          resumen.vencidas],
    ];

    const wsResumen = XLSX.utils.aoa_to_sheet(filasResumen);

    // Ancho de columnas
    wsResumen['!cols'] = [{ wch: 30 }, { wch: 40 }];

    // Merge del título, subtítulo y fecha
    wsResumen['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
    ];

    XLSX.utils.book_append_sheet(workbook, wsResumen, 'Resumen');

    // ═══════════════════════════════════════════════
    // HOJA 2 — Profesores y tareas
    // ═══════════════════════════════════════════════
    const cabecera = [
      'Nombre', 'Apellido', 'Rol', 'Asignatura',
      'Tarea', 'Descripción', 'Fecha límite', 'Estado',
    ];

    const filasProfesores: (string)[][] = [cabecera];

    reporte.profesores.forEach((prof) => {
      if (prof.tareas.length === 0) {
        filasProfesores.push([
          prof.nombre,
          prof.apellido ?? '',
          prof.rol,
          prof.asignatura,
          '— Sin tareas —', '', '', '',
        ]);
        return;
      }

      prof.tareas.forEach((tarea, tIdx) => {
        filasProfesores.push([
          tIdx === 0 ? prof.nombre        : '',
          tIdx === 0 ? (prof.apellido ?? '') : '',
          tIdx === 0 ? prof.rol           : '',
          tIdx === 0 ? prof.asignatura    : '',
          tarea.nombreTarea,
          tarea.descripcion,
          new Date(tarea.fechaLimite).toLocaleDateString('es-ES'),
          this.estadoLabel(tarea.estado),
        ]);
      });
    });

    const wsProfesores = XLSX.utils.aoa_to_sheet(filasProfesores);

    wsProfesores['!cols'] = [
      { wch: 22 }, // Nombre
      { wch: 18 }, // Apellido
      { wch: 22 }, // Rol
      { wch: 24 }, // Asignatura
      { wch: 28 }, // Tarea
      { wch: 40 }, // Descripción
      { wch: 16 }, // Fecha límite
      { wch: 14 }, // Estado
    ];

    XLSX.utils.book_append_sheet(workbook, wsProfesores, 'Profesores y Tareas');

    // ─────────────────────────────────────────────
    // Descargar
    // ─────────────────────────────────────────────
    const nombreArchivo = `Reporte_${reporte.colectivo.nombre.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, nombreArchivo);
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