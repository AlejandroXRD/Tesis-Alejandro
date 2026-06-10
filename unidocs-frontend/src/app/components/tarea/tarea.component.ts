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
  template: `
    <section class="tarea-page container">
      <!-- Header -->
      <header class="page-header">
        <div class="header-inner">
          <span class="eyebrow">
            <span class="eyebrow-dot"></span>
            Gestión de Tareas
          </span>
          <h1>Crear Nueva Tarea</h1>
          <p class="subtitle">Asigna una tarea a un profesor existente en el sistema.</p>
        </div>
        <div class="header-deco" aria-hidden="true"></div>
      </header>

      <!-- Contenido principal -->
      <div class="tarea-container">
        <!-- Formulario de creación -->
        <section class="form-section">
          <div class="form-card">
            <h2>Nueva Tarea</h2>

            <form (ngSubmit)="onSubmit()" class="form-content">
              <!-- Nombre de la tarea -->
              <div class="form-group">
                <label for="nombreTarea" class="form-label">
                  Nombre de la tarea
                  <span class="required">*</span>
                </label>
                <input
                  id="nombreTarea"
                  type="text"
                  [(ngModel)]="form.nombreTarea"
                  name="nombreTarea"
                  class="form-input"
                  placeholder="Ej: Revisar documentos"
                  required
                />
                <span class="form-hint">Breve título de la tarea</span>
              </div>

              <!-- Descripción -->
              <div class="form-group">
                <label for="descripcion" class="form-label">
                  Descripción
                  <span class="required">*</span>
                </label>
                <textarea
                  id="descripcion"
                  [(ngModel)]="form.descripcion"
                  name="descripcion"
                  class="form-input form-textarea"
                  placeholder="Describe la tarea en detalle"
                  rows="4"
                  required
                ></textarea>
                <span class="form-hint">Detalle sobre qué debe hacer el profesor</span>
              </div>

              <!-- Colectivo -->
              <div class="form-group">
                <label for="colectivoId" class="form-label">
                  Colectivo
                  <span class="required">*</span>
                </label>
                <select
                  id="colectivoId"
                  [(ngModel)]="form.colectivoId"
                  name="colectivoId"
                  class="form-input form-select"
                  required
                  (ngModelChange)="onColectivoChange($event)"
                >
                  <option value="">Selecciona un colectivo</option>
                  <option *ngFor="let c of colectivos" [value]="c.colectivoId">
                    {{ c.nombreColectivo }} ({{ c.year }})
                  </option>
                </select>
                <span class="form-hint">Selecciona el colectivo para cargar sus profesores</span>
              </div>

              <!-- Profesor -->
              <div class="form-group">
                <label for="profesorId" class="form-label">
                  Profesor
                  <span class="required">*</span>
                </label>
                <select
                  id="profesorId"
                  [(ngModel)]="form.profesorId"
                  name="profesorId"
                  class="form-input form-select"
                  required
                >
                  <option value="">Selecciona un profesor</option>
                  <option *ngFor="let profesor of profesores" [value]="profesor.userId">
                    {{ profesor.userName }} - {{ profesor.apellido }}
                  </option>
                </select>
                <span class="form-hint">Selecciona el profesor responsable de la tarea</span>
              </div>

              <!-- Fecha límite -->
              <div class="form-group">
                <label for="fechaLimite" class="form-label">
                  Fecha límite
                  <span class="required">*</span>
                </label>
                <input
                  id="fechaLimite"
                  type="datetime-local"
                  [(ngModel)]="form.fechaLimite"
                  name="fechaLimite"
                  class="form-input"
                  required
                />
                <span class="form-hint">Fecha y hora límite para completar la tarea</span>
              </div>

              <!-- Botones -->
              <div class="form-actions">
                <button
                  type="button"
                  class="btn btn--secondary"
                  (click)="onCancel()"
                  [disabled]="isLoading"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="btn btn--primary"
                  [disabled]="isLoading || !isFormValid()"
                >
                  <span *ngIf="!isLoading">Crear Tarea</span>
                  <span *ngIf="isLoading">Creando...</span>
                </button>
              </div>

              <!-- Mensajes -->
              <div *ngIf="errorMessage" class="message-error" role="alert">
                {{ errorMessage }}
              </div>
              <div *ngIf="successMessage" class="message-success" role="alert">
                {{ successMessage }}
              </div>
            </form>
          </div>
        </section>

        <!-- Información sobre carga -->
        <aside class="info-section" *ngIf="profesores.length === 0 && !loadingProfesores">
          <div class="info-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h3>No hay profesores disponibles</h3>
            <p>Por favor, crea profesores en el sistema antes de asignar tareas.</p>
          </div>
        </aside>

        <aside class="info-section" *ngIf="loadingProfesores">
          <div class="info-card loading">
            <div class="spinner"></div>
            <p>Cargando profesores...</p>
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .tarea-page {
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      min-height: 100vh;
      background-color: var(--bg-secondary);
    }

    /* HEADER */
    .page-header {
      position: relative;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }

    .header-inner { position: relative; z-index: 1; }

    .header-deco {
      position: absolute;
      top: -50px; right: -50px;
      width: 220px; height: 220px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(30, 64, 175, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%);
      pointer-events: none;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--primary-color);
      margin-bottom: 0.6rem;
    }

    .eyebrow-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--primary-color);
    }

    .page-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.2;
      margin-bottom: 0.4rem;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* CONTAINER */
    .tarea-container {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    /* FORM SECTION */
    .form-section { flex: 1; }

    .form-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .form-card h2 {
      margin-bottom: 1.5rem;
      color: var(--text-primary);
      font-size: 1.3rem;
    }

    /* FORM CONTENT */
    .form-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-weight: 500;
      color: var(--text-primary);
      font-size: 0.95rem;
    }

    .required {
      color: var(--error-color);
      margin-left: 0.25rem;
    }

    .form-input {
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-family: inherit;
      transition: border-color 0.2s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
    }

    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }

    .form-select {
      cursor: pointer;
    }

    .form-hint {
      font-size: 0.8rem;
      color: var(--text-secondary);
    }

    /* FORM ACTIONS */
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    /* BUTTONS */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      font-size: 0.9rem;
    }

    .btn:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn--primary {
      background-color: var(--primary-color);
      color: white;
    }

    .btn--primary:hover:not(:disabled) {
      background-color: var(--primary-dark);
      box-shadow: 0 4px 12px rgba(30, 64, 175, 0.25);
    }

    .btn--secondary {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }

    .btn--secondary:hover:not(:disabled) {
      background-color: var(--bg-secondary);
      border-color: var(--primary-color);
    }

    /* MESSAGES */
    .message-error {
      padding: 0.75rem 1rem;
      background-color: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 4px;
      color: var(--error-color);
      font-size: 0.9rem;
    }

    .message-success {
      padding: 0.75rem 1rem;
      background-color: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 4px;
      color: var(--success-color);
      font-size: 0.9rem;
    }

    /* INFO SECTION */
    .info-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .info-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem 1.5rem;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .info-card svg {
      margin: 0 auto 1rem;
      color: var(--text-secondary);
    }

    .info-card h3 {
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .info-card p {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .info-card.loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--border-color);
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .tarea-container {
        grid-template-columns: 1fr;
      }

      .page-header h1 {
        font-size: 1.5rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class TareaComponent implements OnInit {
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
    this.router.navigate(['/colectivos']);
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
