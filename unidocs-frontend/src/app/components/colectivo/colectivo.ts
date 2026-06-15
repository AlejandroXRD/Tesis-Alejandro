import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColectivoService, Colectivo, Profesor, ProfessorAsignmentDto } from '../../services/colectivo.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

type Curso = 'DIURNO' | 'ENCUENTRO';
type Periodo = 'PRIMERO' | 'SEGUNDO';

interface ProfessorSelection {
  profesor: Profesor;
  seleccionado: boolean;
  asignatura: string;
}

interface ProfesorAsignadoView {
  userId: string;
  userName: string;
  apellido?: string;
  asignatura: string;
}

@Component({
  selector: 'app-colectivo',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorModule],
  templateUrl: './colectivo.html',
  styleUrl: './colectivo.css'
})
export class ColectivoComponent implements OnInit {

  private readonly rolesPermitidos = new Set(['ADMIN', 'DECANO_VICEDECANO', 'JEFE_DEPARTAMENTO']);

  puedeGestionarColectivos = signal<boolean>(false);
  esUsuarioNormal = signal<boolean>(false);

  readonly opcionesAnioAcademico = [1, 2, 3, 4, 5];

  readonly opcionesPeriodo: { valor: Periodo; label: string }[] = [
    { valor: 'PRIMERO',  label: 'Primer período'  },
    { valor: 'SEGUNDO',  label: 'Segundo período' },
  ];

  // ── Estados ──
  cursoSeleccionado = signal<Curso | null>(null);
  colectivoActivo   = signal<Colectivo | null>(null);
  cargando          = signal<boolean>(false);
  mensaje           = signal<string>('');
  error             = signal<string>('');

  // Modales
  modalAbierto       = signal<boolean>(false);
  modoModal          = signal<'crear' | 'editar'>('crear');
  colectivoEditandoId: string | null = null;

  // Profesores
  modalAsignarAbierto  = signal<boolean>(false);
  profesoresDisponibles = signal<ProfessorSelection[]>([]);
  cargandoProfesores   = signal<boolean>(false);

  // Estado privado
  private colectivos        = signal<Colectivo[]>([]);
  anioFiltro                = signal<number>(0);
  private todosLosProfesores: Profesor[] = [];

  first = signal<number>(0);
  rows  = signal<number>(5);

  // ── Formulario ──
  form = {
    nombreColectivo: '',
    year:    null as number | null,
    periodo: null as Periodo | null,
  };

  errores = signal<Record<string, string>>({});

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

  constructor(private colectivoService: ColectivoService) {
    const user   = JSON.parse(localStorage.getItem('user') || 'null');
    const rolRaw = (user?.rol ?? '').toString();
    const rol    = rolRaw.toUpperCase().replace(/\s+/g, '_').trim();

    const esAdmin = this.rolesPermitidos.has(rol);
    this.puedeGestionarColectivos.set(esAdmin);
    this.esUsuarioNormal.set(!esAdmin);
  }

  ngOnInit(): void {
    this.cargarProfesores();
  }

  private cargarProfesores(): void {
    this.cargandoProfesores.set(true);
    this.colectivoService.getAllProfesores().subscribe({
      next: (profesores) => {
        this.todosLosProfesores = profesores;
        this.cargandoProfesores.set(false);
      },
      error: (err) => {
        console.error('Error al cargar profesores:', err);
        this.cargandoProfesores.set(false);
      }
    });
  }

  // ── Selección de curso ──
  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado.set(curso);
    this.anioFiltro.set(0);
    this.first.set(0);
    this.rows.set(5);
    this.error.set('');
    this.colectivoActivo.set(null);
    this.cargando.set(true);

    const esUsuarioNormal = this.esUsuarioNormal();

    const servicio$ = esUsuarioNormal
      ? (curso === 'DIURNO' ? this.colectivoService.getMisColectivosDiurno()    : this.colectivoService.getMisColectivosEncuentro())
      : (curso === 'DIURNO' ? this.colectivoService.getAllDiurno()               : this.colectivoService.getAllEncuentro());

    servicio$.subscribe({
      next: (datos: any) => {
        const colectivosArray = Array.isArray(datos) ? datos : (datos.colectivos ?? []);
        this.colectivos.set(colectivosArray);

        const filtrados = this.colectivosFiltrados();
        this.colectivoActivo.set(filtrados[0] ?? colectivosArray[0] ?? null);

        if (esUsuarioNormal && colectivosArray.length === 0) {
          this.mensaje.set(`No estás asignado a ningún colectivo ${curso}.`);
        } else {
          this.mensaje.set('');
        }

        this.cargando.set(false);
      },
      error: (err: any) => {
        console.error('Error al cargar colectivos:', err);
        this.error.set(
          err.status === 401
            ? 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
            : 'Error al cargar los colectivos. Intente nuevamente.'
        );
        this.cargando.set(false);
      }
    });
  }

  filterByYear(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.anioFiltro.set(Number(target.value));
    this.first.set(0);
    this.rows.set(5);
    const actualVisible = this.colectivosFiltrados().some(
      c => c.colectivoId === this.colectivoActivo()?.colectivoId
    );
    if (!actualVisible) {
      this.colectivoActivo.set(this.colectivosFiltrados()[0] ?? null);
    }
  }

  volverASeleccion(): void {
    this.cursoSeleccionado.set(null);
    this.colectivoActivo.set(null);
    this.anioFiltro.set(0);
    this.mensaje.set('');
    this.error.set('');
  }

  seleccionarColectivo(id: string): void {
    const encontrado = this.colectivos().find(c => c.colectivoId === id) ?? null;
    this.colectivoActivo.set(encontrado);
    this.mensaje.set('');
  }

  // ── Modal crear/editar ──
  abrirModal(): void {
    this.modoModal.set('crear');
    this.colectivoEditandoId = null;
    this.form = { nombreColectivo: '', year: null, periodo: null };
    this.errores.set({});
    this.modalAbierto.set(true);
  }

  editarColectivo(): void {
    const activo = this.colectivoActivo();
    if (!activo) return;

    this.modoModal.set('editar');
    this.colectivoEditandoId = activo.colectivoId;
    this.form = {
      nombreColectivo: activo.nombreColectivo,
      year:    activo.year,
      periodo: (activo as any).periodo ?? null,
    };
    this.errores.set({});
    this.modalAbierto.set(true);
  }

  cerrarModal(): void {
    this.modalAbierto.set(false);
    this.modoModal.set('crear');
    this.colectivoEditandoId = null;
    this.errores.set({});
  }

  limpiarError(campo: string): void {
    this.errores.update(errs => {
      const copia = { ...errs };
      delete copia[campo];
      return copia;
    });
  }

  private validarForm(): boolean {
    const nuevosErrores: Record<string, string> = {};

    if (!this.form.nombreColectivo.trim()) {
      nuevosErrores['nombreColectivo'] = 'El nombre del colectivo es obligatorio.';
    }

    if (this.form.year === null || this.form.year === undefined) {
      nuevosErrores['year'] = 'Selecciona un año académico.';
    } else if (this.form.year < 1 || this.form.year > 10) {
      nuevosErrores['year'] = 'El año académico debe estar entre 1 y 10.';
    }

    if (!this.form.periodo) {
      nuevosErrores['periodo'] = 'Selecciona un período académico.';
    }

    this.errores.set(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  confirmarAccion(): void {
    if (this.modoModal() === 'crear') {
      this.crearColectivo();
    } else {
      this.guardarEdicion();
    }
  }

  private crearColectivo(): void {
    const curso = this.cursoSeleccionado();
    if (!curso || !this.validarForm()) return;

    const nuevoColectivo = {
      nombreColectivo: this.form.nombreColectivo.trim(),
      year:     this.form.year!,
      modalidad: curso,
      periodo:  this.form.periodo!,
    };

    this.colectivoService.createColectivo(nuevoColectivo).subscribe({
      next: (colectivo) => {
        this.colectivos.update(list => [colectivo, ...list]);
        this.colectivoActivo.set(colectivo);
        this.mensaje.set(`Colectivo "${nuevoColectivo.nombreColectivo}" creado exitosamente.`);
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al crear colectivo:', err);
        this.error.set('Error al crear el colectivo. Intente nuevamente.');
      }
    });
  }

  private guardarEdicion(): void {
    if (this.colectivoEditandoId === null || !this.validarForm()) return;

    const datosActualizados = {
      nombreColectivo: this.form.nombreColectivo.trim(),
      year:    this.form.year!,
      periodo: this.form.periodo!,
    };

    this.colectivoService.updateColectivo(this.colectivoEditandoId, datosActualizados).subscribe({
      next: (colectivo) => {
        this.colectivos.update(list =>
          list.map(c => (c.colectivoId === this.colectivoEditandoId ? colectivo : c))
        );
        this.colectivoActivo.set(colectivo);
        this.mensaje.set('Colectivo actualizado correctamente.');
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al actualizar colectivo:', err);
        this.error.set('Error al actualizar el colectivo. Intente nuevamente.');
      }
    });
  }

  eliminarColectivo(): void {
    const activo = this.colectivoActivo();
    if (!activo) return;
    if (!confirm(`¿Estás seguro de que deseas eliminar el colectivo "${activo.nombreColectivo}"?`)) return;

    this.colectivoService.deleteColectivo(activo.colectivoId).subscribe({
      next: () => {
        const nombreEliminado = activo.nombreColectivo;
        this.colectivos.update(list => list.filter(c => c.colectivoId !== activo.colectivoId));
        this.colectivoActivo.set(this.colectivosFiltrados()[0] ?? null);
        this.mensaje.set(`Colectivo "${nombreEliminado}" eliminado correctamente.`);
      },
      error: (err) => {
        console.error('Error al eliminar colectivo:', err);
        this.error.set('Error al eliminar el colectivo. Intente nuevamente.');
      }
    });
  }

  // ── Modal asignar profesores ──
  abrirModalAsignarProfesores(): void {
    const activo = this.colectivoActivo();
    if (!activo) return;

    const mapeados = this.todosLosProfesores.map(prof => ({
      profesor: prof,
      seleccionado: activo.profesores?.some(p => p.userId === prof.userId) ?? false,
      asignatura:   activo.profesores?.find(p => p.userId === prof.userId)?.asignatura ?? ''
    }));

    this.profesoresDisponibles.set(mapeados);
    this.modalAsignarAbierto.set(true);
  }

  cerrarModalAsignarProfesores(): void {
    this.modalAsignarAbierto.set(false);
    this.profesoresDisponibles.set([]);
  }

  toggleProfesor(index: number): void {
    this.profesoresDisponibles.update(list => {
      const copia = [...list];
      copia[index] = {
        ...copia[index],
        seleccionado: !copia[index].seleccionado,
        asignatura: !copia[index].seleccionado ? copia[index].asignatura : ''
      };
      return copia;
    });
  }

  guardarProfesoresAsignados(): void {
    const activo = this.colectivoActivo();
    if (!activo) return;

    const profesoresSeleccionados = this.profesoresDisponibles().filter(p => p.seleccionado);

    if (profesoresSeleccionados.some(p => !p.asignatura.trim())) {
      this.error.set('Todos los profesores seleccionados deben tener una asignatura asignada.');
      return;
    }

    const profesoresParaEnviar: ProfessorAsignmentDto[] = profesoresSeleccionados.map(p => ({
      profesorId: p.profesor.userId,
      asignatura: p.asignatura.trim()
    }));

    this.colectivoService.updateColectivo(activo.colectivoId, { profesores: profesoresParaEnviar }).subscribe({
      next: (colectivo) => {
        const profesoresCompletos: ProfesorAsignadoView[] = profesoresSeleccionados.map(p => ({
          userId:    p.profesor.userId,
          userName:  p.profesor.userName,
          apellido:  p.profesor.apellido,
          asignatura: p.asignatura.trim()
        }));

        const colectivoActualizado: Colectivo = {
          ...colectivo,
          profesores: profesoresCompletos as any
        };

        this.colectivos.update(list =>
          list.map(c => (c.colectivoId === activo.colectivoId ? colectivoActualizado : c))
        );
        this.colectivoActivo.set(colectivoActualizado);
        this.mensaje.set('Profesores asignados correctamente.');
        this.cerrarModalAsignarProfesores();
        this.error.set('');
      },
      error: (err) => {
        console.error('Error al asignar profesores:', err);
        this.error.set('Error al asignar profesores. Intente nuevamente.');
      }
    });
  }

  onPageChange(event: PaginatorState): void {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 5);
  }

  periodoLabel(periodo: string | null | undefined): string {
    return periodo === 'PRIMERO' ? 'Primer período' : 'Segundo período';
  }

  /** Expone el período del colectivo activo sin bracket notation en el template */
  get periodoActivo(): string | null {
    return (this.colectivoActivo() as any)?.periodo ?? null;
  }
}