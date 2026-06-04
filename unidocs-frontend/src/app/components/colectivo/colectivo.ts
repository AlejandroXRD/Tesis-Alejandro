import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Curso = 'DIURNO' | 'POR_ENCUENTROS';

interface ColectivoItem {
  id: number;
  nombre: string;
  anio: number;            // Año académico (1°, 2°, 3°, etc.)
  curso: Curso;
  anioEscolar: string;     // Curso escolar ("2024-2025")
  profesores: number;
}

interface FormColectivo {
  anioEscolar: string;
  anioAcademico: number | null;
  cantidadProfesores: number | null;
}

type ModoModal = 'crear' | 'editar';

@Component({
  selector: 'app-colectivo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="colectivo-page container">

      <!-- Header -->
      <header class="page-header">
        <div class="header-inner">
          <span class="eyebrow">
            <span class="eyebrow-dot"></span>
            Gestión de Colectivos
          </span>
          <h1 *ngIf="!cursoSeleccionado">Seleccione un Curso</h1>
          <h1 *ngIf="cursoSeleccionado">
            Colectivos
            <span class="h1-accent">{{ cursoSeleccionado === 'DIURNO' ? 'Diurno' : 'Por Encuentros' }}</span>
          </h1>
          <p class="subtitle" *ngIf="!cursoSeleccionado">
            Elige el tipo de curso para explorar y gestionar los colectivos disponibles.
          </p>
          <p class="subtitle" *ngIf="cursoSeleccionado">
            Administra, edita o elimina colectivos del curso seleccionado.
          </p>
        </div>
        <div class="header-deco" aria-hidden="true"></div>
      </header>

      <!-- Selección de curso -->
      <div class="selection-grid" *ngIf="!cursoSeleccionado">
        <button class="course-card course-diurno" (click)="seleccionarCurso('DIURNO')">
          <div class="course-icon course-icon--diurno">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </div>
          <div class="course-body">
            <span class="course-tag">Curso</span>
            <strong>Diurno</strong>
            <p>Ver colectivos del turno diurno</p>
          </div>
          <svg class="course-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        <button class="course-card course-encuentros" (click)="seleccionarCurso('POR_ENCUENTROS')">
          <div class="course-icon course-icon--encuentros">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div class="course-body">
            <span class="course-tag">Curso</span>
            <strong>Por Encuentros</strong>
            <p>Ver colectivos del curso por encuentros</p>
          </div>
          <svg class="course-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>

      <!-- Workspace -->
      <div class="colectivo-workspace" *ngIf="cursoSeleccionado">

        <div class="toolbar">
          <div class="toolbar-group">
            <button class="btn btn--primary" (click)="abrirModal()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Crear Colectivo
            </button>
            <button class="btn btn--secondary" (click)="editarColectivo()" [disabled]="!colectivoActivo">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/>
              </svg>
              Editar
            </button>
            <button class="btn btn--danger" (click)="eliminarColectivo()" [disabled]="!colectivoActivo">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Eliminar
            </button>
          </div>
          <button class="btn btn--ghost" (click)="volverASeleccion()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Cambiar curso
          </button>
        </div>

        <div class="status-message status-message--success" *ngIf="mensaje" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {{ mensaje }}
        </div>

        <div class="content-grid">

          <!-- Lista -->
          <section class="panel list-panel">
            <div class="panel-header">
              <h2>Colectivos</h2>
              <span class="count-badge">{{ colectivosFiltrados.length }}</span>
            </div>
            <div class="panel-body">
              <div class="colective-list" *ngIf="colectivosFiltrados.length > 0; else emptyState">
                <button
                  class="colective-card"
                  *ngFor="let colectivo of colectivosFiltrados"
                  [class.colective-card--active]="colectivoActivo?.id === colectivo.id"
                  (click)="seleccionarColectivo(colectivo.id)"
                >
                  <div class="card-year-stripe">{{ colectivo.anio }}°</div>
                  <div class="card-content">
                    <strong class="card-nombre">{{ colectivo.nombre }}</strong>
                    <p class="card-desc">Curso escolar: {{ colectivo.anioEscolar }}</p>
                    <div class="card-meta">
                      <span class="meta-chip">
                        <span class="chip-dot chip-dot--success"></span>
                        {{ colectivo.profesores }} profesores
                      </span>
                      <span class="meta-chip meta-chip--primary">
                        {{ colectivo.curso === 'DIURNO' ? 'Diurno' : 'Por Encuentros' }}
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              <ng-template #emptyState>
                <div class="empty-state">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                    <polyline points="13 2 13 9 20 9"/>
                  </svg>
                  <p>No hay colectivos para este curso.</p>
                  <button class="btn btn--primary mt-4" (click)="abrirModal()">Crear primero</button>
                </div>
              </ng-template>
            </div>
          </section>

          <!-- Detalle -->
          <aside class="panel detail-panel" *ngIf="colectivoActivo; else noSelection">
            <div class="panel-header">
              <h2>Detalle</h2>
            </div>
            <div class="panel-body">
              <div class="detail-year-badge">{{ colectivoActivo.anio }}° año académico</div>
              <h3 class="detail-nombre">{{ colectivoActivo.nombre }}</h3>
              <p class="detail-desc">Curso escolar {{ colectivoActivo.anioEscolar }}</p>
              <div class="detail-divider"></div>
              <dl class="detail-list">
                <div class="detail-row">
                  <dt>Curso</dt>
                  <dd>{{ colectivoActivo.curso === 'DIURNO' ? 'Diurno' : 'Por Encuentros' }}</dd>
                </div>
                <div class="detail-row">
                  <dt>Año académico</dt>
                  <dd>{{ colectivoActivo.anio }}°</dd>
                </div>
                <div class="detail-row">
                  <dt>Año escolar</dt>
                  <dd>{{ colectivoActivo.anioEscolar }}</dd>
                </div>
                <div class="detail-row">
                  <dt>Profesores</dt>
                  <dd>{{ colectivoActivo.profesores }}</dd>
                </div>
              </dl>
            </div>
          </aside>

          <ng-template #noSelection>
            <aside class="panel detail-panel">
              <div class="panel-header">
                <h2>Detalle</h2>
              </div>
              <div class="panel-body">
                <div class="empty-state">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <p>Selecciona un colectivo para ver sus detalles.</p>
                </div>
              </div>
            </aside>
          </ng-template>

        </div>
      </div>

      <!-- ── MODAL CREAR / EDITAR COLECTIVO ── -->
      <div class="modal-backdrop" *ngIf="modalAbierto" (click)="cerrarModal()" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal" (click)="$event.stopPropagation()">

          <div class="modal-header">
            <div class="modal-title-group">
              <div class="modal-icon">
                <svg *ngIf="modoModal === 'crear'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <svg *ngIf="modoModal === 'editar'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/>
                </svg>
              </div>
              <div>
                <h2 id="modal-title">{{ modoModal === 'crear' ? 'Nuevo Colectivo' : 'Editar Colectivo' }}</h2>
                <p class="modal-subtitle">
                  Curso
                  <span class="modal-curso-badge" [class.badge--diurno]="cursoSeleccionado === 'DIURNO'" [class.badge--encuentros]="cursoSeleccionado === 'POR_ENCUENTROS'">
                    {{ cursoSeleccionado === 'DIURNO' ? 'Diurno' : 'Por Encuentros' }}
                  </span>
                </p>
              </div>
            </div>
            <button class="modal-close" (click)="cerrarModal()" aria-label="Cerrar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="modal-body">

            <!-- Año académico -->
            <div class="form-group">
              <label class="form-label" for="anioAcademico">
                Año académico
                <span class="form-required" aria-hidden="true">*</span>
              </label>
              <div class="select-wrapper">
                <select
                  id="anioAcademico"
                  class="form-input form-input--select"
                  [class.form-input--error]="errores.anioAcademico"
                  [(ngModel)]="form.anioAcademico"
                  (ngModelChange)="limpiarError('anioAcademico')"
                >
                  <option [ngValue]="null" disabled>Selecciona un año académico</option>
                  <option *ngFor="let anio of opcionesAnioAcademico" [ngValue]="anio">{{ anio }}° año</option>
                </select>
                <svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              <span class="form-hint" *ngIf="!errores.anioAcademico">Año o grado que cursa el colectivo</span>
              <span class="form-error" *ngIf="errores.anioAcademico" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ errores.anioAcademico }}
              </span>
            </div>

            <!-- Año del curso escolar -->
            <div class="form-group">
              <label class="form-label" for="anioEscolar">
                Año del curso escolar
                <span class="form-required" aria-hidden="true">*</span>
              </label>
              <input
                id="anioEscolar"
                type="text"
                class="form-input"
                [class.form-input--error]="errores.anioEscolar"
                placeholder="Ej: 2024-2025"
                [(ngModel)]="form.anioEscolar"
                (ngModelChange)="limpiarError('anioEscolar')"
              />
              <span class="form-hint" *ngIf="!errores.anioEscolar">Formato recomendado: AAAA-AAAA</span>
              <span class="form-error" *ngIf="errores.anioEscolar" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ errores.anioEscolar }}
              </span>
            </div>

            <!-- Cantidad de profesores -->
            <div class="form-group">
              <label class="form-label" for="cantidadProfesores">
                Cantidad de profesores
                <span class="form-required" aria-hidden="true">*</span>
              </label>
              <div class="input-number-wrapper">
                <button type="button" class="input-number-btn" (click)="decrementarProfesores()" [disabled]="(form.cantidadProfesores ?? 0) <= 0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <input
                  id="cantidadProfesores"
                  type="number"
                  class="form-input form-input--number"
                  [class.form-input--error]="errores.cantidadProfesores"
                  placeholder="0"
                  min="0"
                  [(ngModel)]="form.cantidadProfesores"
                  (ngModelChange)="limpiarError('cantidadProfesores')"
                />
                <button type="button" class="input-number-btn" (click)="incrementarProfesores()">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
              <span class="form-error" *ngIf="errores.cantidadProfesores" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ errores.cantidadProfesores }}
              </span>
            </div>

          </div>

          <div class="modal-footer">
            <button class="btn btn--ghost" (click)="cerrarModal()">Cancelar</button>
            <button class="btn btn--primary" (click)="confirmarAccion()">
              <svg *ngIf="modoModal === 'crear'" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <svg *ngIf="modoModal === 'editar'" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              {{ modoModal === 'crear' ? 'Crear Colectivo' : 'Guardar Cambios' }}
            </button>
          </div>

        </div>
      </div>

    </section>
  `,
  styles: [`
    :host { display: block; }

    .colectivo-page {
      padding-top: 2rem;
      padding-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
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
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    }

    .header-inner { position: relative; z-index: 1; }

    .header-deco {
      position: absolute;
      top: -50px; right: -50px;
      width: 220px; height: 220px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(30,64,175,0.08) 0%, rgba(124,58,237,0.08) 100%);
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
      display: inline-block;
    }

    .page-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.2;
      margin-bottom: 0.4rem;
    }

    .h1-accent { color: var(--primary-color); }

    .subtitle {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* SELECTION */
    .selection-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .course-card {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1.5rem;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      cursor: pointer;
      text-align: left;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .course-card:hover {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(30,64,175,0.08), 0 4px 12px rgba(0,0,0,0.08);
      transform: translateY(-2px);
    }

    .course-icon {
      width: 52px; height: 52px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    .course-icon--diurno { background-color: rgba(30,64,175,0.08); color: var(--primary-color); }
    .course-icon--encuentros { background-color: rgba(124,58,237,0.08); color: var(--secondary-color); }

    .course-body { flex: 1; }

    .course-tag {
      display: block;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-tertiary);
      margin-bottom: 0.15rem;
    }

    .course-body strong {
      display: block;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.3rem;
    }

    .course-body p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.4; }

    .course-arrow {
      color: var(--text-tertiary);
      transition: transform 0.2s ease, color 0.2s ease;
      flex-shrink: 0;
    }

    .course-card:hover .course-arrow { transform: translateX(4px); color: var(--primary-color); }

    /* WORKSPACE */
    .colectivo-workspace { display: flex; flex-direction: column; gap: 1rem; }

    /* TOOLBAR */
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: space-between;
      align-items: center;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 0.875rem 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .toolbar-group { display: flex; flex-wrap: wrap; gap: 0.5rem; }

    /* BUTTONS */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
      white-space: nowrap;
      line-height: 1.4;
    }

    .btn:hover:not(:disabled) { transform: translateY(-1px); }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn--primary { background-color: var(--primary-color); color: #ffffff; border-color: var(--primary-color); }
    .btn--primary:hover:not(:disabled) { background-color: var(--primary-dark); border-color: var(--primary-dark); box-shadow: 0 2px 8px rgba(30,64,175,0.25); }

    .btn--secondary { background-color: var(--bg-tertiary); color: var(--text-primary); border-color: var(--border-color); }
    .btn--secondary:hover:not(:disabled) { background-color: var(--bg-secondary); border-color: var(--primary-color); color: var(--primary-color); }

    .btn--danger { background-color: transparent; color: var(--error-color); border-color: var(--border-color); }
    .btn--danger:hover:not(:disabled) { background-color: rgba(239,68,68,0.07); border-color: var(--error-color); }

    .btn--ghost { background-color: transparent; color: var(--text-secondary); border-color: var(--border-color); }
    .btn--ghost:hover:not(:disabled) { background-color: var(--bg-tertiary); color: var(--text-primary); }

    /* STATUS */
    .status-message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      animation: fadeIn 0.25s ease;
    }

    .status-message--success {
      background-color: rgba(16,185,129,0.1);
      border: 1px solid rgba(16,185,129,0.3);
      color: var(--success-color);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* CONTENT GRID */
    .content-grid { display: grid; grid-template-columns: 1.7fr 1fr; gap: 1rem; align-items: start; }

    /* PANELS */
    .panel {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1.25rem;
      border-bottom: 1px solid var(--border-color);
      background-color: var(--bg-secondary);
    }

    .panel-header h2 { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin: 0; }

    .panel-body { padding: 1rem 1.25rem; }

    .count-badge {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 22px; height: 22px; padding: 0 6px;
      border-radius: 999px;
      background-color: var(--primary-color);
      color: #ffffff;
      font-size: 0.72rem; font-weight: 700;
    }

    /* LIST */
    .colective-list { display: flex; flex-direction: column; gap: 0.5rem; }

    .colective-card {
      display: flex;
      width: 100%;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background-color: var(--bg-secondary);
      cursor: pointer;
      text-align: left;
      transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
      overflow: hidden;
    }

    .colective-card:hover { border-color: var(--primary-light); box-shadow: 0 0 0 3px rgba(30,64,175,0.06); background-color: var(--bg-primary); }
    .colective-card--active { border-color: var(--primary-color); background-color: var(--bg-primary); box-shadow: 0 0 0 3px rgba(30,64,175,0.1); }

    .card-year-stripe {
      width: 38px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem; font-weight: 700; color: #ffffff;
      background-color: var(--text-secondary);
      writing-mode: vertical-rl; text-orientation: mixed; letter-spacing: 0.05em;
    }

    .colective-card--active .card-year-stripe { background-color: var(--primary-color); }

    .card-content { padding: 0.85rem 1rem; flex: 1; min-width: 0; }

    .card-nombre { display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.3rem; }

    .card-desc { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.6rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .card-meta { display: flex; flex-wrap: wrap; gap: 0.35rem; }

    .meta-chip {
      display: inline-flex; align-items: center; gap: 0.3rem;
      font-size: 0.72rem; font-weight: 500;
      padding: 0.18rem 0.5rem; border-radius: 999px;
      background-color: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-secondary);
    }

    .meta-chip--primary { background-color: rgba(30,64,175,0.07); border-color: rgba(30,64,175,0.2); color: var(--primary-color); }

    .chip-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
    .chip-dot--success { background-color: var(--success-color); }

    /* DETAIL */
    .detail-year-badge {
      display: inline-block;
      font-size: 0.72rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--primary-color);
      background-color: rgba(30,64,175,0.07);
      border: 1px solid rgba(30,64,175,0.2);
      border-radius: 999px; padding: 0.18rem 0.6rem; margin-bottom: 0.75rem;
    }

    .detail-nombre { font-size: 1.25rem; font-weight: 600; color: var(--text-primary); line-height: 1.25; margin-bottom: 0.5rem; }
    .detail-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem; }
    .detail-divider { height: 1px; background-color: var(--border-color); margin-bottom: 1rem; }
    .detail-list { display: flex; flex-direction: column; }

    .detail-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 0.6rem 0; border-bottom: 1px solid var(--border-color-light); font-size: 0.875rem;
    }

    .detail-row:last-child { border-bottom: none; }
    .detail-row dt { color: var(--text-secondary); font-weight: 400; }
    .detail-row dd { font-weight: 600; color: var(--text-primary); }

    /* EMPTY STATE */
    .empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 2rem 1rem; text-align: center; }
    .empty-icon { color: var(--text-tertiary); }
    .empty-state p { color: var(--text-secondary); font-size: 0.875rem; }

    .mt-4 { margin-top: 1rem; }

    /* ── MODAL ── */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      animation: backdropIn 0.2s ease;
    }

    @keyframes backdropIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .modal {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      width: 100%;
      max-width: 480px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1);
      animation: modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
    }

    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.94) translateY(10px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
      background-color: var(--bg-secondary);
    }

    .modal-title-group {
      display: flex;
      align-items: flex-start;
      gap: 0.875rem;
    }

    .modal-icon {
      width: 36px; height: 36px;
      border-radius: 8px;
      background-color: rgba(30,64,175,0.1);
      color: var(--primary-color);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    .modal-header h2 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.2rem;
      line-height: 1.3;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin: 0;
    }

    .modal-curso-badge {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
    }

    .badge--diurno { background-color: rgba(30,64,175,0.1); color: var(--primary-color); }
    .badge--encuentros { background-color: rgba(124,58,237,0.1); color: var(--secondary-color); }

    .modal-close {
      width: 32px; height: 32px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      background-color: transparent;
      color: var(--text-tertiary);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease;
      flex-shrink: 0;
    }

    .modal-close:hover { background-color: var(--bg-tertiary); color: var(--text-primary); }

    .modal-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    /* FORM */
    .form-group { display: flex; flex-direction: column; gap: 0.35rem; }

    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .form-required { color: var(--error-color); }

    .form-input {
      width: 100%;
      padding: 0.6rem 0.875rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 0.875rem;
      color: var(--text-primary);
      background-color: var(--bg-primary);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      font-family: inherit;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(30,64,175,0.12);
    }

    .form-input--error {
      border-color: var(--error-color);
      box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
    }

    .form-hint { font-size: 0.78rem; color: var(--text-tertiary); }

    .form-error {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.78rem;
      color: var(--error-color);
      font-weight: 500;
    }

    /* SELECT WRAPPER */
    .select-wrapper {
      position: relative;
    }

    .form-input--select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      padding-right: 2.25rem;
      cursor: pointer;
    }

    .select-chevron {
      position: absolute;
      right: 0.875rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
      pointer-events: none;
    }

    .form-input--select option {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }

    /* INPUT NUMBER CON BOTONES +/- */
    .input-number-wrapper {
      display: flex;
      align-items: stretch;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      overflow: hidden;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .input-number-wrapper:focus-within {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(30,64,175,0.12);
    }

    .input-number-btn {
      display: flex; align-items: center; justify-content: center;
      width: 38px;
      background-color: var(--bg-secondary);
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease;
      flex-shrink: 0;
    }

    .input-number-btn:hover:not(:disabled) { background-color: var(--bg-tertiary); color: var(--primary-color); }
    .input-number-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .form-input--number {
      border: none;
      border-radius: 0;
      text-align: center;
      flex: 1;
      min-width: 0;
      box-shadow: none !important;
    }

    .form-input--number::-webkit-inner-spin-button,
    .form-input--number::-webkit-outer-spin-button { -webkit-appearance: none; }
    .form-input--number { -moz-appearance: textfield; }

    /* MODAL FOOTER */
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--border-color);
      background-color: var(--bg-secondary);
    }

    /* RESPONSIVE */
    @media (max-width: 900px) { .content-grid { grid-template-columns: 1fr; } }

    @media (max-width: 640px) {
      .colectivo-page { padding-top: 1rem; padding-bottom: 1rem; }
      .page-header h1 { font-size: 1.6rem; }
      .toolbar { flex-direction: column; align-items: stretch; }
      .toolbar-group { width: 100%; }
      .btn { justify-content: center; width: 100%; }
      .course-card { flex-direction: column; text-align: center; }
      .course-arrow { display: none; }
      .modal-footer { flex-direction: column-reverse; }
      .modal-footer .btn { width: 100%; justify-content: center; }
    }
  `]
})
export class ColectivoComponent {
  // Opciones disponibles para el año académico
  readonly opcionesAnioAcademico = [1, 2, 3, 4, 5];

  cursoSeleccionado: Curso | null = null;
  colectivoActivo: ColectivoItem | null = null;
  mensaje = '';

  // Estado del modal
  modalAbierto = false;
  modoModal: ModoModal = 'crear';
  colectivoEditandoId: number | null = null;
  form: FormColectivo = { anioEscolar: '', anioAcademico: null, cantidadProfesores: null };
  errores: Partial<Record<keyof FormColectivo, string>> = {};

  private colectivos: ColectivoItem[] = [];

  get colectivosFiltrados(): ColectivoItem[] {
    if (!this.cursoSeleccionado) return [];
    return this.colectivos.filter(c => c.curso === this.cursoSeleccionado);
  }

  // ── Selección de curso ──
  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado = curso;
    this.colectivoActivo = this.colectivosFiltrados[0] ?? null;
    this.mensaje = '';
  }

  volverASeleccion(): void {
    this.cursoSeleccionado = null;
    this.colectivoActivo = null;
    this.mensaje = '';
  }

  seleccionarColectivo(id: number): void {
    this.colectivoActivo = this.colectivosFiltrados.find(c => c.id === id) ?? null;
    this.mensaje = '';
  }

  // ── Modal ──
  abrirModal(): void {
    this.modoModal = 'crear';
    this.colectivoEditandoId = null;
    this.form = { anioEscolar: '', anioAcademico: null, cantidadProfesores: null };
    this.errores = {};
    this.modalAbierto = true;
  }

  private abrirModalEditar(colectivo: ColectivoItem): void {
    this.modoModal = 'editar';
    this.colectivoEditandoId = colectivo.id;
    this.form = {
      anioEscolar: colectivo.anioEscolar,
      anioAcademico: colectivo.anio,
      cantidadProfesores: colectivo.profesores
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

  limpiarError(campo: keyof FormColectivo): void {
    delete this.errores[campo];
  }

  incrementarProfesores(): void {
    this.form.cantidadProfesores = (this.form.cantidadProfesores ?? 0) + 1;
    this.limpiarError('cantidadProfesores');
  }

  decrementarProfesores(): void {
    const actual = this.form.cantidadProfesores ?? 0;
    if (actual > 0) {
      this.form.cantidadProfesores = actual - 1;
    }
  }

  // ── Validación ──
  private validarForm(): boolean {
    this.errores = {};

    // Año académico
    if (this.form.anioAcademico === null || this.form.anioAcademico === undefined) {
      this.errores.anioAcademico = 'Selecciona un año académico.';
    } else if (this.form.anioAcademico < 1 || this.form.anioAcademico > 10) {
      this.errores.anioAcademico = 'El año académico debe estar entre 1 y 10.';
    }

    // Año escolar
    const anio = this.form.anioEscolar.trim();
    if (!anio) {
      this.errores.anioEscolar = 'El año del curso escolar es obligatorio.';
    } else if (!/^\d{4}(-\d{4})?$/.test(anio)) {
      this.errores.anioEscolar = 'Formato inválido. Use AAAA o AAAA-AAAA.';
    }

    // Cantidad de profesores
    if (this.form.cantidadProfesores === null || this.form.cantidadProfesores === undefined) {
      this.errores.cantidadProfesores = 'Indica la cantidad de profesores.';
    } else if (this.form.cantidadProfesores < 0) {
      this.errores.cantidadProfesores = 'La cantidad no puede ser negativa.';
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

    const siguienteId = this.colectivos.length > 0
      ? Math.max(...this.colectivos.map(c => c.id)) + 1
      : 1;

    const nuevoColectivo: ColectivoItem = {
      id: siguienteId,
      nombre: this.generarNombre(this.cursoSeleccionado, this.form.anioAcademico!),
      anio: this.form.anioAcademico!,
      curso: this.cursoSeleccionado,
      anioEscolar: this.form.anioEscolar.trim(),
      profesores: this.form.cantidadProfesores!
    };

    this.colectivos = [nuevoColectivo, ...this.colectivos];
    this.colectivoActivo = nuevoColectivo;
    this.mensaje = `Colectivo creado: ${nuevoColectivo.nombre} (curso escolar ${nuevoColectivo.anioEscolar}) con ${nuevoColectivo.profesores} profesores.`;
    this.cerrarModal();
  }

  private guardarEdicion(): void {
    if (this.colectivoEditandoId === null || !this.validarForm()) return;

    const id = this.colectivoEditandoId;
    this.colectivos = this.colectivos.map(c => {
      if (c.id !== id) return c;
      return {
        ...c,
        nombre: this.generarNombre(c.curso, this.form.anioAcademico!),
        anio: this.form.anioAcademico!,
        anioEscolar: this.form.anioEscolar.trim(),
        profesores: this.form.cantidadProfesores!
      };
    });

    this.colectivoActivo = this.colectivos.find(c => c.id === id) ?? null;
    this.mensaje = `Colectivo actualizado correctamente.`;
    this.cerrarModal();
  }

  private generarNombre(curso: Curso, anioAcademico: number): string {
    const cursoLabel = curso === 'DIURNO' ? 'Diurno' : 'Por Encuentros';
    return `Colectivo ${cursoLabel} ${anioAcademico}°`;
  }

  // ── Editar / Eliminar ──
  editarColectivo(): void {
    if (!this.colectivoActivo) return;
    // Capturamos el colectivo actual antes de abrir el modal
    const colectivo = { ...this.colectivoActivo };
    this.abrirModalEditar(colectivo);
  }

  eliminarColectivo(): void {
    if (!this.colectivoActivo) return;
    const idEliminado = this.colectivoActivo.id;
    const nombre = this.colectivoActivo.nombre;
    this.colectivos = this.colectivos.filter(c => c.id !== idEliminado);
    this.colectivoActivo = this.colectivosFiltrados[0] ?? null;
    this.mensaje = `Colectivo "${nombre}" eliminado correctamente.`;
  }
}
