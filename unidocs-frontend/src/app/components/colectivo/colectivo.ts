import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColectivoService, Colectivo, Profesor, ProfessorAsignmentDto } from '../../services/colectivo.service';

type Curso = 'DIURNO' | 'ENCUENTRO';

interface ProfessorSelection {
  profesor: Profesor;
  seleccionado: boolean;
  asignatura: string;
}

@Component({
  selector: 'app-colectivo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colectivo.html',
  styleUrl: './colectivo.css'
})
export class ColectivoComponent implements OnInit {
  // Opciones disponibles para el año académico
  readonly opcionesAnioAcademico = [1, 2, 3, 4, 5];

  cursoSeleccionado: Curso | null = null;
  colectivoActivo: Colectivo | null = null;
  mensaje = '';
  cargando = false;
  error = '';

  // Estado del modal de crear/editar colectivo
  modalAbierto = false;
  modoModal: 'crear' | 'editar' = 'crear';
  colectivoEditandoId: string | null = null;
  form = { nombreColectivo: '', year: null as number | null };
  errores: Record<string, string> = {};

  // Estado del modal de asignar profesores
  modalAsignarAbierto = false;
  profesoresDisponibles: ProfessorSelection[] = [];
  cargandoProfesores = false;

  private colectivos: Colectivo[] = [];
  private todosLosProfesores: Profesor[] = [];

  constructor(private colectivoService: ColectivoService) {}

  ngOnInit(): void {
    this.cargarProfesores();
  }

  private cargarProfesores(): void {
    this.cargandoProfesores = true;
    this.colectivoService.getAllProfesores().subscribe({
      next: (profesores) => {
        this.todosLosProfesores = profesores;
        this.cargandoProfesores = false;
      },
      error: (err) => {
        console.error('Error al cargar profesores:', err);
        this.cargandoProfesores = false;
      }
    });
  }

  get colectivosFiltrados(): Colectivo[] {
    if (!this.cursoSeleccionado) return [];
    return this.colectivos.filter(c => c.modalidad === this.cursoSeleccionado);
  }

  // ── Selección de curso ──
  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado = curso;
    this.cargando = true;
    this.error = '';
    this.colectivoActivo = null;

    // Cargar colectivos del backend según la modalidad
    const servicio$ = curso === 'DIURNO' 
      ? this.colectivoService.getAllDiurno() 
      : this.colectivoService.getAllEncuentro();

    servicio$.subscribe({
      next: (datos) => {
        this.colectivos = datos;
        this.colectivoActivo = this.colectivos[0] ?? null;
        this.cargando = false;
        this.mensaje = '';
      },
      error: (err) => {
        console.error('Error al cargar colectivos:', err);
        this.error = 'Error al cargar los colectivos. Intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  volverASeleccion(): void {
    this.cursoSeleccionado = null;
    this.colectivoActivo = null;
    this.mensaje = '';
    this.error = '';
  }

  seleccionarColectivo(id: string): void {
    this.colectivoActivo = this.colectivosFiltrados.find(c => c.colectivoId === id) ?? null;
    this.mensaje = '';
  }

  // ── Modal de crear/editar colectivo ──
  abrirModal(): void {
    this.modoModal = 'crear';
    this.colectivoEditandoId = null;
    this.form = { nombreColectivo: '', year: null };
    this.errores = {};
    this.modalAbierto = true;
  }

  private abrirModalEditar(colectivo: Colectivo): void {
    this.modoModal = 'editar';
    this.colectivoEditandoId = colectivo.colectivoId;
    this.form = {
      nombreColectivo: colectivo.nombreColectivo,
      year: colectivo.year
    };
    this.errores = {};
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.modoModal = 'crear';
    this.colectivoEditandoId = null;
    this.errores = {};
  }

  limpiarError(campo: string): void {
    delete this.errores[campo];
  }

  // ── Validación ──
  private validarForm(): boolean {
    this.errores = {};

    if (!this.form.nombreColectivo.trim()) {
      this.errores['nombreColectivo'] = 'El nombre del colectivo es obligatorio.';
    }

    if (this.form.year === null || this.form.year === undefined) {
      this.errores['year'] = 'Selecciona un año académico.';
    } else if (this.form.year < 1 || this.form.year > 10) {
      this.errores['year'] = 'El año académico debe estar entre 1 y 10.';
    }

    return Object.keys(this.errores).length === 0;
  }

  // ── Confirmar acción (crear o editar) ──
  confirmarAccion(): void {
    if (this.modoModal === 'crear') {
      this.crearColectivo();
    } else {
      this.guardarEdicion();
    }
  }

  private crearColectivo(): void {
    if (!this.cursoSeleccionado || !this.validarForm()) return;

    const nuevoColectivo = {
      nombreColectivo: this.form.nombreColectivo.trim(),
      year: this.form.year!,
      modalidad: this.cursoSeleccionado
    };

    this.colectivoService.createColectivo(nuevoColectivo).subscribe({
      next: (colectivo) => {
        this.colectivos = [colectivo, ...this.colectivos];
        this.colectivoActivo = colectivo;
        this.mensaje = `Colectivo "${nuevoColectivo.nombreColectivo}" creado exitosamente.`;
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al crear colectivo:', err);
        this.error = 'Error al crear el colectivo. Intente nuevamente.';
      }
    });
  }

  private guardarEdicion(): void {
    if (this.colectivoEditandoId === null || !this.validarForm()) return;

    const datosActualizados = {
      nombreColectivo: this.form.nombreColectivo.trim(),
      year: this.form.year!
    };

    this.colectivoService.updateColectivo(this.colectivoEditandoId, datosActualizados).subscribe({
      next: (colectivo) => {
        this.colectivos = this.colectivos.map(c => c.colectivoId === this.colectivoEditandoId ? colectivo : c);
        this.colectivoActivo = colectivo;
        this.mensaje = 'Colectivo actualizado correctamente.';
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al actualizar colectivo:', err);
        this.error = 'Error al actualizar el colectivo. Intente nuevamente.';
      }
    });
  }

  // ── Editar / Eliminar ──
  editarColectivo(): void {
    if (!this.colectivoActivo) return;
    const colectivo = { ...this.colectivoActivo };
    this.abrirModalEditar(colectivo);
  }

  eliminarColectivo(): void {
    if (!this.colectivoActivo) return;
    if (!confirm(`¿Estás seguro de que deseas eliminar el colectivo "${this.colectivoActivo.nombreColectivo}"?`)) return;

    this.colectivoService.deleteColectivo(this.colectivoActivo.colectivoId).subscribe({
      next: () => {
        const nombreEliminado = this.colectivoActivo!.nombreColectivo;
        this.colectivos = this.colectivos.filter(c => c.colectivoId !== this.colectivoActivo!.colectivoId);
        this.colectivoActivo = this.colectivosFiltrados[0] ?? null;
        this.mensaje = `Colectivo "${nombreEliminado}" eliminado correctamente.`;
      },
      error: (err) => {
        console.error('Error al eliminar colectivo:', err);
        this.error = 'Error al eliminar el colectivo. Intente nuevamente.';
      }
    });
  }

  // ── Modal de asignar profesores ──
  abrirModalAsignarProfesores(): void {
    if (!this.colectivoActivo) return;

    // Preparar lista de profesores con estado de selección
    this.profesoresDisponibles = this.todosLosProfesores.map(prof => ({
      profesor: prof,
      seleccionado: this.colectivoActivo!.profesores?.some(p => p.userId === prof.userId) ?? false,
      asignatura: this.colectivoActivo!.profesores?.find(p => p.userId === prof.userId)?.asignatura ?? ''
    }));

    this.modalAsignarAbierto = true;
  }

  cerrarModalAsignarProfesores(): void {
    this.modalAsignarAbierto = false;
    this.profesoresDisponibles = [];
  }

  guardarProfesoresAsignados(): void {
    if (!this.colectivoActivo) return;

    // Validar que todos los profesores seleccionados tengan asignatura
    const profesoresSeleccionados = this.profesoresDisponibles.filter(p => p.seleccionado);
    if (profesoresSeleccionados.some(p => !p.asignatura.trim())) {
      this.error = 'Todos los profesores seleccionados deben tener una asignatura asignada.';
      return;
    }

    const profesoresParaEnviar: ProfessorAsignmentDto[] = profesoresSeleccionados.map(p => ({
      profesorId: p.profesor.userId,
      asignatura: p.asignatura.trim()
    }));

    this.colectivoService.updateColectivo(this.colectivoActivo.colectivoId, { profesores: profesoresParaEnviar }).subscribe({
      next: (colectivo) => {
        this.colectivos = this.colectivos.map(c => c.colectivoId === this.colectivoActivo!.colectivoId ? colectivo : c);
        this.colectivoActivo = colectivo;
        this.mensaje = 'Profesores asignados correctamente.';
        this.cerrarModalAsignarProfesores();
        this.error = '';
      },
      error: (err) => {
        console.error('Error al asignar profesores:', err);
        this.error = 'Error al asignar profesores. Intente nuevamente.';
      }
    });
  }

  toggleProfesor(index: number): void {
    this.profesoresDisponibles[index].seleccionado = !this.profesoresDisponibles[index].seleccionado;
    if (!this.profesoresDisponibles[index].seleccionado) {
      this.profesoresDisponibles[index].asignatura = '';
    }
  }
}
