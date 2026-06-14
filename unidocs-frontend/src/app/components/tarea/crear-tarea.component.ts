import { Component, OnInit, inject } from '@angular/core';
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

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: "./crear-tarea.component.css",
  templateUrl: "./crear-tarea.component.html"
  
  
})
export class CrearTareaComponent implements OnInit {
  private tareaService = inject(TareaService);
  private router = inject(Router);
  private colectivoService = inject(ColectivoService);

  form: TareaForm = {
    nombreTarea: '',
    descripcion: '',
    fechaLimite: '',
    profesorId: '',
    colectivoId: ''
  };

  colectivos: Colectivo[] = [];
  profesores: User[] = [];

  isLoading = false;
  loadingProfesores = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadColectivos();
  }

  loadColectivos(): void {
    this.errorMessage = '';
    this.loadingProfesores = false;

    this.colectivoService.getAllColectivos().subscribe({
      next: (colectivos: Colectivo[]) => {
        this.colectivos = colectivos;
        this.profesores = [];
      },
      error: (error: unknown) => {
        console.error('Error loading colectivos:', error);
        this.errorMessage = 'Error al cargar los colectivos';
      },
    });
  }

  onColectivoChange(colectivoId: string): void {
    this.form.profesorId = '';
    this.profesores = [];

    if (!colectivoId) return;

    const selected = this.colectivos.find((c) => c.colectivoId === colectivoId);
    const profesores = selected?.profesores ?? [];

    this.profesores = profesores.map((p) => ({
      userId: p.userId,
      userName: p.userName,
      apellido: p.apellido,
      rol: 'PROFESOR',
      createdAt: '',
    }));
  }

  isFormValid(): boolean {
    return (
      this.form.nombreTarea.trim().length > 0 &&
      this.form.descripcion.trim().length > 0 &&
      this.form.fechaLimite.length > 0 &&
      this.form.colectivoId.length > 0 &&
      this.form.profesorId.length > 0
    );
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const createRequest: CreateTareaRequest = {
      nombreTarea: this.form.nombreTarea,
      descripcion: this.form.descripcion,
      fechaLimite: new Date(this.form.fechaLimite).toISOString(),
      estado: 'PENDIENTE',
      profesorId: this.form.profesorId
    };

    this.tareaService.createTarea(createRequest).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Tarea creada exitosamente';
        this.resetForm();
        // Optional: redirect after success
        setTimeout(() => {
          this.router.navigate(['/colectivos']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating task:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error al crear la tarea. Intenta nuevamente.';
        }
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
    this.profesores = [];
    this.errorMessage = '';
    this.successMessage = '';
  }
}
