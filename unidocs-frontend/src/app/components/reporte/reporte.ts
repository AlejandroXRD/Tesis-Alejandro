import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColectivoService, Colectivo } from '../../services/colectivo.service';
import { ReporteService, ReporteColectivo } from '../../services/reporte.service';
import { AuthService } from '../../services/auth.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import * as ExcelJS from 'exceljs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart,
  BarController, BarElement,
  CategoryScale, LinearScale,
  Tooltip, Legend
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
type Curso = 'DIURNO' | 'ENCUENTRO';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorModule, BaseChartDirective],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css'
})
export class ReporteComponent implements OnInit {

  // ── Curso / lista ──
  cursoSeleccionado = signal<Curso | null>(null);
  anioFiltro = signal<number>(0);
  periodoFiltro = signal<string>('');
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
    const periodo = this.periodoFiltro();
    if (periodo) res = res.filter(c => c.periodo === periodo);
    return res;
  });

  periodosDisponibles = computed(() => {
    const curso = this.cursoSeleccionado();
    if (!curso) return [];
    const periodos = this.colectivos()
      .filter(c => c.modalidad === curso)
      .map(c => c.periodo)
      .filter((v, i, a) => v && a.indexOf(v) === i)
      .sort();
    return periodos;
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
      vencidas: tareas.filter(t => t.estado === 'RECHAZADA').length,
    };
  });

  // ── Gráfico 1: tareas por estado ──
  chartEstados = computed<ChartData<'bar'>>(() => {
    const r = this.tareasResumen();
    return {
      labels: ['Completadas', 'Pendientes', 'Rechazadas'],
      datasets: [{
        label: 'Tareas',
        data: [r.completadas, r.pendientes, r.vencidas],
        backgroundColor: [
          'rgba(16,185,129,0.75)',
          'rgba(245,158,11,0.75)',
          'rgba(239,68,68,0.75)',
        ],
        borderColor: [
          '#059669',
          '#d97706',
          '#dc2626',
        ],
        borderWidth: 1.5,
        borderRadius: 6,
      }]
    };
  });

  // ── Gráfico 2: tareas por profesor ──
  chartProfesores = computed<ChartData<'bar'>>(() => {
    const r = this.reporte();
    if (!r) return { labels: [], datasets: [] };
    return {
      labels: r.profesores.map(p => `${p.nombre} ${p.apellido ?? ''}`),
      datasets: [
        {
          label: 'Completadas',
          data: r.profesores.map(p => p.tareas.filter(t => t.estado === 'COMPLETADA').length),
          backgroundColor: 'rgba(16,185,129,0.75)',
          borderColor: '#059669',
          borderWidth: 1.5,
          borderRadius: 6,
        },
        {
          label: 'Pendientes',
          data: r.profesores.map(p => p.tareas.filter(t => t.estado === 'PENDIENTE').length),
          backgroundColor: 'rgba(245,158,11,0.75)',
          borderColor: '#d97706',
          borderWidth: 1.5,
          borderRadius: 6,
        },
        {
          label: 'Rechazadas',
          data: r.profesores.map(p => p.tareas.filter(t => t.estado === 'RECHAZADA').length),
          backgroundColor: 'rgba(239,68,68,0.75)',
          borderColor: '#dc2626',
          borderWidth: 1.5,
          borderRadius: 6,
        },
      ]
    };
  });

  chartOpciones: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, precision: 0 },
      }
    }
  };

  constructor(
    private colectivoService: ColectivoService,
    private reporteService: ReporteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  private isPpa(): boolean {
    const user = this.authService.getUser();
    return user?.rol === 'PPA';
  }

  private isProfesor(): boolean {
    const user = this.authService.getUser();
    return user?.rol === 'PROFESOR';
  }

  private isRestrictedRole(): boolean {
    return this.isPpa() || this.isProfesor();
  }

  // ── Selección de curso ──
  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado.set(curso);
    this.anioFiltro.set(0);
    this.periodoFiltro.set('');
    this.first.set(0);
    this.colectivoActivo.set(null);
    this.reporte.set(null);
    this.error.set('');
    this.cargandoColectivos.set(true);

    const isRestricted = this.isRestrictedRole();
    const servicio$ = isRestricted
      ? (curso === 'DIURNO'
          ? this.colectivoService.getMisColectivosDiurno()
          : this.colectivoService.getMisColectivosEncuentro())
      : (curso === 'DIURNO'
          ? this.colectivoService.getAllDiurno()
          : this.colectivoService.getAllEncuentro());

    servicio$.subscribe({
      next: (datos) => {
        const colectivos = isRestricted ? (datos.colectivos ?? []) : datos;
        this.colectivos.set(colectivos);
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
    this.periodoFiltro.set('');
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

  filterByPeriodo(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.periodoFiltro.set(target.value);
    this.first.set(0);
    const visible = this.colectivosFiltrados().some(
      c => c.colectivoId === this.colectivoActivo()?.colectivoId
    );
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

  // ── Métodos de utilidad para estados ──

  estadoLabel(estado: string): string {
    switch (estado) {
      case 'COMPLETADA': return 'Completada';
      case 'PENDIENTE':  return 'Pendiente';
      case 'RECHAZADA':  return 'RECHAZADA';
      default:           return estado;
    }
  }

  estadoClass(estado: string): Record<string, boolean> {
    return {
      'estado-completada': estado === 'COMPLETADA',
      'estado-pendiente':  estado === 'PENDIENTE',
      'estado-rechazada':  estado === 'RECHAZADA',
    };
  }

  esFechaVencida(fecha: string | Date): boolean {
    return new Date(fecha) < new Date();
  }

  // ── Exportar Excel ──

  async exportarExcel(): Promise<void> {
    const reporte = this.reporte();
    if (!reporte) return;

    const resumen = this.tareasResumen();
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Tu App';
    workbook.created = new Date();

    const wsResumen = workbook.addWorksheet('Resumen', {
      pageSetup: { fitToPage: true, fitToWidth: 1, fitToHeight: 0 }
    });

    const titleStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, size: 14, name: 'Calibri', color: { argb: 'FFFFFFFF' } },
      alignment: { horizontal: 'center', vertical: 'middle' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C3E50' } },
    };

    const subtitleStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, size: 12, name: 'Calibri', color: { argb: 'FFFFFFFF' } },
      alignment: { horizontal: 'center', vertical: 'middle' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF34495E' } },
    };

    const labelStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, name: 'Calibri', size: 11 },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFECF0F1' } },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    };

    const valueStyle: Partial<ExcelJS.Style> = {
      font: { name: 'Calibri', size: 11 },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    };

    wsResumen.addRow(['REPORTE DE COLECTIVO ACADÉMICO']);
    wsResumen.addRow([reporte.colectivo.nombre]);
    wsResumen.addRow([`Generado el ${new Date().toLocaleDateString('es-ES', { dateStyle: 'long' })}`]);
    wsResumen.addRow([]);
    wsResumen.addRow(['DATOS DEL COLECTIVO', '']);
    wsResumen.addRow(['Nombre del colectivo', reporte.colectivo.nombre]);
    wsResumen.addRow(['Año académico', `${reporte.colectivo.año}° año`]);
    wsResumen.addRow(['Modalidad', reporte.colectivo.modalidad === 'DIURNO' ? 'Diurno' : 'Por Encuentros']);
    wsResumen.addRow(['Cantidad de profesores', reporte.colectivo.cantidadProfesores]);
    wsResumen.addRow([]);
    wsResumen.addRow(['RESUMEN DE TAREAS', '']);
    wsResumen.addRow(['Total de tareas', resumen.total]);
    wsResumen.addRow(['Completadas', resumen.completadas]);
    wsResumen.addRow(['Pendientes', resumen.pendientes]);
    wsResumen.addRow(['Vencidas', resumen.vencidas]);

    wsResumen.mergeCells('A1:B1');
    wsResumen.mergeCells('A2:B2');
    wsResumen.mergeCells('A3:B3');

    const titleRow1 = wsResumen.getRow(1);
    titleRow1.height = 25;
    titleRow1.getCell(1).style = titleStyle;

    const titleRow2 = wsResumen.getRow(2);
    titleRow2.height = 22;
    titleRow2.getCell(1).style = subtitleStyle;

    const dateRow = wsResumen.getRow(3);
    dateRow.height = 20;
    dateRow.getCell(1).style = {
      ...subtitleStyle,
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7F8C8D' } }
    };

    for (let i = 5; i <= 16; i++) {
      const row = wsResumen.getRow(i);
      row.getCell(1).style = labelStyle;
      if (i !== 5 && i !== 11) {
        row.getCell(2).style = valueStyle;
      } else {
        row.getCell(1).style = {
          ...labelStyle,
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD5DBDB' } },
          font: { bold: true }
        };
      }
    }

    for (let i = 6; i <= 9; i++) wsResumen.getRow(i).height = 18;
    for (let i = 12; i <= 15; i++) wsResumen.getRow(i).height = 18;

    wsResumen.getColumn(1).width = 30;
    wsResumen.getColumn(2).width = 40;

    const wsProfesores = workbook.addWorksheet('Profesores y Tareas');

    const headerStyle: Partial<ExcelJS.Style> = {
      font: { bold: true, color: { argb: 'FFFFFFFF' }, size: 11, name: 'Calibri' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F618D' } },
      alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    };

    const evenRowStyle: Partial<ExcelJS.Style> = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F6F9' } },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    };

    const oddRowStyle: Partial<ExcelJS.Style> = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } },
      border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    };

    const pendingStyle: Partial<ExcelJS.Style> = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC107' } },
      font: { bold: true, color: { argb: 'FF212529' } }
    };
    const completedStyle: Partial<ExcelJS.Style> = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF28A745' } },
      font: { bold: true, color: { argb: 'FFFFFFFF' } }
    };
    const overdueStyle: Partial<ExcelJS.Style> = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDC3545' } },
      font: { bold: true, color: { argb: 'FFFFFFFF' } }
    };

    const cabecera = [
      'Nombre', 'Apellido', 'Rol', 'Asignatura',
      'Tarea', 'Descripción', 'Fecha límite', 'Estado'
    ];
    const headerRow = wsProfesores.addRow(cabecera);
    headerRow.height = 24;
    headerRow.eachCell((cell) => { cell.style = headerStyle; });

    let rowIndex = 2;
    reporte.profesores.forEach((prof) => {
      const tareas = prof.tareas;
      if (tareas.length === 0) {
        const newRow = wsProfesores.addRow([
          prof.nombre, prof.apellido ?? '', prof.rol, prof.asignatura,
          '— Sin tareas —', '', '', ''
        ]);
        newRow.height = 20;
        newRow.eachCell((cell, colNumber) => {
          cell.style = (rowIndex % 2 === 0) ? { ...evenRowStyle } : { ...oddRowStyle };
          if (colNumber === 5) {
            cell.style = { ...cell.style, font: { italic: true, color: { argb: 'FF6C757D' } } };
          }
        });
        rowIndex++;
        return;
      }

      tareas.forEach((tarea, tIdx) => {
        const estado = this.estadoLabel(tarea.estado);
        const newRow = wsProfesores.addRow([
          tIdx === 0 ? prof.nombre : '',
          tIdx === 0 ? (prof.apellido ?? '') : '',
          tIdx === 0 ? prof.rol : '',
          tIdx === 0 ? prof.asignatura : '',
          tarea.nombreTarea,
          tarea.descripcion,
          new Date(tarea.fechaLimite).toLocaleDateString('es-ES'),
          estado,
        ]);
        newRow.height = 20;

        newRow.eachCell((cell) => {
          cell.style = (rowIndex % 2 === 0) ? { ...evenRowStyle } : { ...oddRowStyle };
          cell.alignment = { vertical: 'middle', wrapText: true };
        });

        const estadoCell = newRow.getCell(8);
        if (estado === 'Completada') {
          estadoCell.style = { ...estadoCell.style, ...completedStyle, alignment: { horizontal: 'center' } };
        } else if (estado === 'Pendiente') {
          estadoCell.style = { ...estadoCell.style, ...pendingStyle, alignment: { horizontal: 'center' } };
        } else if (estado === 'Vencida') {
          estadoCell.style = { ...estadoCell.style, ...overdueStyle, alignment: { horizontal: 'center' } };
        } else {
          estadoCell.style = { ...estadoCell.style, alignment: { horizontal: 'center' } };
        }

        rowIndex++;
      });
    });

    wsProfesores.getColumn(1).width = 22;
    wsProfesores.getColumn(2).width = 18;
    wsProfesores.getColumn(3).width = 22;
    wsProfesores.getColumn(4).width = 24;
    wsProfesores.getColumn(5).width = 28;
    wsProfesores.getColumn(6).width = 40;
    wsProfesores.getColumn(7).width = 16;
    wsProfesores.getColumn(8).width = 14;

    wsProfesores.views = [{ state: 'frozen', ySplit: 1 }];

    const nombreArchivo = `Reporte_${reporte.colectivo.nombre.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}