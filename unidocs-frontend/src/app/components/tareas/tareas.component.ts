import { Component, OnInit, ChangeDetectorRef, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaService, Tarea, EstadoTarea } from '../../services/tarea.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './tareas.component.css',
  templateUrl: './tareas.component.html'
})
export class TareasComponent implements OnInit {
  private tareaService = inject(TareaService);
  private router       = inject(Router);
  private authService  = inject(AuthService);
  private cd           = inject(ChangeDetectorRef);

  loading             = false;
  error               = '';
  sinTareasAsignadas  = false;

  todasLasTareas = signal<Tarea[]>([]);
  estadoFiltro   = signal<string>('');
  profesorFiltro = signal<string>('');

  showUploadModal  = false;
  selectedTareaId: string | null = null;
  selectedFile: File | null = null;
  isDragging       = false;
  uploadError      = '';
  uploading        = false;

  showCommentModal    = false;
  commentTareaId: string | null = null;
  commentAccion: 'COMPLETADA' | 'RECHAZADA' | null = null;
  comentario          = '';
  isSubmittingComment = false;
  commentError        = '';

  loggedUser = computed(() => this.authService.getUser());

  private readonly rolesAdmin = new Set(['ADMIN', 'JEFE_DEPARTAMENTO', 'DECANO_VICEDECANO']);

  profesoresDisponibles = computed(() =>
    this.todasLasTareas()
      .map(t => `${t.profesor.userName} ${t.profesor.apellido}`.trim())
      .filter((v, i, a) => v && a.indexOf(v) === i)
      .sort()
  );

  tareas = computed(() => {
    let res = this.todasLasTareas();
    const estado = this.estadoFiltro();
    if (estado) res = res.filter(t => t.estado === estado);
    const profesor = this.profesorFiltro();
    if (profesor) res = res.filter(
      t => `${t.profesor.userName} ${t.profesor.apellido}`.trim() === profesor
    );
    return res;
  });

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.loading           = true;
    this.error             = '';
    this.sinTareasAsignadas = false;

    const rol       = this.getCurrentRol();
    const peticion$ = this.rolesAdmin.has(rol)
      ? this.tareaService.getAllTareas()
      : this.tareaService.getMisTareas();

    peticion$.subscribe({
      next: (data) => {
        this.todasLasTareas.set(data ?? []);
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 403 || err.status === 404) {
          this.todasLasTareas.set([]);
          this.sinTareasAsignadas = true;
        } else {
          console.error('❌ Error:', err);
          this.error = `Error ${err.status}: No se pudieron cargar las tareas`;
        }
        this.cd.detectChanges();
      }
    });
  }

  filterByEstado(event: Event): void {
    this.estadoFiltro.set((event.target as HTMLSelectElement).value);
  }

  filterByProfesor(event: Event): void {
    this.profesorFiltro.set((event.target as HTMLSelectElement).value);
  }

  resetFiltros(): void {
    this.estadoFiltro.set('');
    this.profesorFiltro.set('');
  }

  getCurrentRol(): string {
    return String(this.loggedUser()?.rol ?? '').toUpperCase().trim();
  }

  canUploadFiles(): boolean {
    const rol = this.getCurrentRol();
    return rol === 'PROFESOR' || rol === 'PPA';
  }

  canReviewFiles(): boolean {
    return this.rolesAdmin.has(this.getCurrentRol());
  }

  canCreateTarea(): boolean {
    return this.canReviewFiles();
  }

  // ── Modal subida ──────────────────────────────────────────────

  openUploadModal(tareaId: string): void {
    this.selectedTareaId = tareaId;
    this.selectedFile    = null;
    this.uploadError     = '';
    this.isDragging      = false;
    this.showUploadModal = true;
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
    this.selectedTareaId = null;
    this.selectedFile    = null;
    this.uploadError     = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) this.handleFile(files[0]);
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) this.handleFile(file);
  }

  handleFile(file: File): void {
    const allowedExt = ['.pdf', '.docx', '.xlsx', '.xls'];
    const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');

    if (!allowedExt.includes(ext)) {
      this.uploadError = 'Formato no permitido. Solo .pdf, .docx, .xlsx, .xls';
      this.selectedFile = null;
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      this.uploadError = 'El archivo excede los 20MB';
      this.selectedFile = null;
      return;
    }
    this.uploadError  = '';
    this.selectedFile = file;
  }

  uploadFile(): void {
    if (!this.selectedFile || !this.selectedTareaId) return;
    this.uploading = true;
    this.tareaService.uploadArchivo(this.selectedTareaId, this.selectedFile).subscribe({
      next: () => {
        this.uploading = false;
        this.closeUploadModal();
        this.cargarTareas();
      },
      error: (err: any) => {
        console.error('❌ Error al subir:', err);
        this.uploadError = `Error ${err.status}: ${err.error?.message || 'No se pudo subir'}`;
        this.uploading   = false;
        this.cd.detectChanges();
      }
    });
  }

  // ── Descarga ──────────────────────────────────────────────────

  downloadFile(tareaId: string): void {
    this.tareaService.downloadArchivo(tareaId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a   = document.createElement('a');
        a.href     = url;
        a.download = `tarea-${tareaId}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        console.error('❌ Error al descargar:', err);
        alert('No se pudo descargar el archivo');
      }
    });
  }

  // ── EN_REVISION directo ───────────────────────────────────────

  marcarEnRevision(tareaId: string): void {
    this.tareaService.updateEstado(tareaId, 'EN_REVISION').subscribe({
      next: () => this.cargarTareas(),
      error: (err: any) => {
        console.error('❌ Error al marcar en revisión:', err);
        alert(`No se pudo actualizar: ${err.error?.message || err.message}`);
      }
    });
  }

  // ── Modal comentarios ─────────────────────────────────────────

  openCommentModal(tareaId: string, accion: 'COMPLETADA' | 'RECHAZADA'): void {
    this.commentTareaId  = tareaId;
    this.commentAccion   = accion;
    this.comentario      = '';
    this.commentError    = '';
    this.showCommentModal = true;
  }

  closeCommentModal(): void {
    this.showCommentModal = false;
    this.commentTareaId  = null;
    this.commentAccion   = null;
    this.comentario      = '';
    this.commentError    = '';
  }

  submitComment(): void {
    if (!this.commentTareaId || !this.commentAccion) return;

    if (!this.comentario.trim()) {
      this.commentError = 'El comentario no puede estar vacío';
      return;
    }

    this.isSubmittingComment = true;
    this.commentError        = '';

    this.tareaService.updateEstadoConComentario(
      this.commentTareaId,
      this.commentAccion,
      this.comentario.trim()
    ).subscribe({
      next: () => {
        this.isSubmittingComment = false;
        this.closeCommentModal();
        this.cargarTareas();
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('❌ Error al enviar comentario:', err);
        this.commentError        = `Error: ${err.error?.message || 'No se pudo enviar el comentario'}`;
        this.isSubmittingComment = false;
        this.cd.detectChanges();
      }
    });
  }

  // ── Verificaciones ────────────────────────────────────────────

  tieneArchivo(tarea: Tarea): boolean {
    return !!tarea.archivo;
  }

  getAccionLabel(estado: EstadoTarea): string {
    switch (estado) {
      case 'COMPLETADA': return '✓ Aprobada';
      case 'RECHAZADA':  return '✗ Rechazada';
      default:           return estado;
    }
  }

  getCommentModalTitle(): string {
    if (this.commentAccion === 'COMPLETADA') return 'Aprobar Tarea';
    if (this.commentAccion === 'RECHAZADA')  return 'Rechazar Tarea';
    return 'Comentario';
  }

  // ── Eliminar ──────────────────────────────────────────────────

  eliminarTarea(tarea: Tarea): void {
    const confirmar = confirm(
      `¿Estás seguro de que deseas eliminar la tarea "${tarea.nombreTarea}"?\n\nEsta acción no se puede deshacer.`
    );
    if (!confirmar) return;

    this.tareaService.deleteTarea(tarea.tareaId).subscribe({
      next: () => {
        console.log(`✅ Tarea "${tarea.nombreTarea}" eliminada`);
        this.cargarTareas();
      },
      error: (err: any) => {
        console.error('❌ Error al eliminar:', err);
        alert(`No se pudo eliminar la tarea: ${err.error?.message || err.message}`);
      }
    });
  }

  // ── Utilidades ────────────────────────────────────────────────

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return !isNaN(d.getTime()) ? d.toLocaleString() : fecha;
  }

  getEstadoClass(estado: string): string {
    return `estado-${estado.toLowerCase()}`;
  }

  navigateToCrearTarea(): void {
    this.router.navigate(['/crear-tareas']);
  }
}