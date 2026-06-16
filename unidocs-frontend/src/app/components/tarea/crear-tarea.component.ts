import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaService, CreateTareaRequest } from '../../services/tarea.service';
import { User, UserService } from '../../services/user.service';
import { Colectivo, ColectivoService } from '../../services/colectivo.service';

interface TareaForm {
  nombreTarea: string;
  descripcion: string;
  fechaLimite: string;
  profesorId: string;
  colectivoId: string;
}

interface ProfesorConRol extends User {
  esProfesor?: boolean;
  esPPA?: boolean;
}

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: "./crear-tarea.component.css",
  templateUrl: "./crear-tarea.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearTareaComponent implements OnInit {
  private tareaService = inject(TareaService);
  private router = inject(Router);
  private colectivoService = inject(ColectivoService);
  private cdr = inject(ChangeDetectorRef);

  form: TareaForm = {
    nombreTarea: '',
    descripcion: '',
    fechaLimite: '',
    profesorId: '',
    colectivoId: ''
  };

  // ── Signals ──
  colectivos = signal<Colectivo[]>([]);
  profesores = signal<ProfesorConRol[]>([]);
  isLoading = signal(false);
  loadingProfesores = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  colectivoSeleccionado = signal<Colectivo | null>(null);

  // ── Computed ──
  profesoresFiltered = computed(() => {
    return this.profesores().filter(p => p.esProfesor);
  });

  ppaFiltered = computed(() => {
    return this.profesores().filter(p => p.esPPA);
  });

  ngOnInit(): void {
    this.loadColectivos();
  }

  loadColectivos(): void {
    this.errorMessage.set('');
    this.loadingProfesores.set(false);

    this.colectivoService.getAllColectivos().subscribe({
      next: (colectivos: Colectivo[]) => {
        this.colectivos.set(colectivos);
        this.profesores.set([]);
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error loading colectivos:', error);
        this.errorMessage.set('Error al cargar los colectivos');
        this.cdr.markForCheck();
      },
    });
  }

  onColectivoChange(colectivoId: string): void {
    this.form.profesorId = '';
    this.profesores.set([]);
    this.colectivoSeleccionado.set(null);

    if (!colectivoId) {
      this.cdr.markForCheck();
      return;
    }

    // Mostrar estado de carga
    this.loadingProfesores.set(true);
    this.cdr.markForCheck();

    // Buscar el colectivo seleccionado
    const selected = this.colectivos().find((c) => c.colectivoId === colectivoId);
    
    if (selected) {
      this.colectivoSeleccionado.set(selected);
      
      // Mapear los profesores con su información
      const profesoresConRol: ProfesorConRol[] = (selected?.profesores ?? []).map((p: any) => ({
        userId: p.profesor.userId,
        userName: p.profesor.userName,
        apellido: p.profesor.apellido,
        rol: p.profesor.rol,
        createdAt: p.createdAt,
        esProfesor: p.profesor.rol === 'PROFESOR',
        esPPA: p.profesor.rol === 'PPA'
      }));

      this.profesores.set(profesoresConRol);
      console.log('Profesores cargados:', profesoresConRol);
    }

    // Simular un pequeño delay para que se vea el estado de carga
    setTimeout(() => {
      this.loadingProfesores.set(false);
      this.cdr.markForCheck();
    }, 300);
  }

  isFormValid(): boolean {
    const now = new Date();
    const fechaIngresada = this.form.fechaLimite ? new Date(this.form.fechaLimite) : null;

    return (
      this.form.nombreTarea.trim().length > 0 &&
      this.form.descripcion.trim().length > 0 &&
      this.form.fechaLimite.length > 0 &&
      this.form.colectivoId.length > 0 &&
      this.form.profesorId.length > 0 &&
      fechaIngresada !== null &&
      fechaIngresada > now
    );
  }

  getMinFecha(): string {
    const now = new Date();
    // Formato: YYYY-MM-DDTHH:mm
    return now.toISOString().slice(0, 16);
  }

  isFechaEnPasado(): boolean {
    if (!this.form.fechaLimite) return false;
    const now = new Date();
    const fechaIngresada = new Date(this.form.fechaLimite);
    return fechaIngresada <= now;
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      if (this.isFechaEnPasado()) {
        this.errorMessage.set('La fecha límite no puede ser en el pasado');
      } else {
        this.errorMessage.set('Por favor completa todos los campos obligatorios');
      }
      this.cdr.markForCheck();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.cdr.markForCheck();

    const createRequest: CreateTareaRequest = {
      nombreTarea: this.form.nombreTarea,
      descripcion: this.form.descripcion,
      fechaLimite: new Date(this.form.fechaLimite).toISOString(),
      estado: 'PENDIENTE',
      profesorId: this.form.profesorId
    };

    this.tareaService.createTarea(createRequest).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Tarea creada exitosamente');
        this.cdr.markForCheck();
        this.resetForm();
        
        setTimeout(() => {
          this.router.navigate(['/tareas']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error creating task:', error);
        if (error.error && error.error.message) {
          this.errorMessage.set(error.error.message);
        } else {
          this.errorMessage.set('Error al crear la tarea. Intenta nuevamente.');
        }
        this.cdr.markForCheck();
      }
    });
  }

  onCancel(): void {
    this.resetForm();
    this.router.navigate(['/tareas']);
  }

  resetForm(): void {
    this.form = {
      nombreTarea: '',
      descripcion: '',
      fechaLimite: '',
      colectivoId: '',
      profesorId: ''
    };
    this.profesores.set([]);
    this.colectivoSeleccionado.set(null);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.loadingProfesores.set(false);
    this.cdr.markForCheck();
  }

  getRolBadge(profesor: ProfesorConRol): string {
    if (profesor.esProfesor) return 'Profesor';
    if (profesor.esPPA) return 'PPA';
    return profesor.rol || 'Usuario';
  }

  selectProfesor(profesor: ProfesorConRol): void {
    this.form.profesorId = profesor.userId;
    this.cdr.markForCheck();
  }
}