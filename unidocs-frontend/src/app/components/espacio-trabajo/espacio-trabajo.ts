// src/app/components/espacio-trabajo/espacio-trabajo.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { UploadsService, WorkspaceFile, Category } from '../../services/uploads.service';

const ALLOWED_ROLES_UPLOAD = new Set(['ADMIN', 'DECANO_VICEDECANO']);

@Component({
  selector: 'app-espacio-trabajo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './espacio-trabajo.html',
  styleUrl: './espacio-trabajo.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EspacioTrabajoComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // ── Estado del usuario ──
  private userRole: string = '';

  // ── Modal ──
  showModal       = false;
  currentCategory: Category | null = null;
  currentFiles:    WorkspaceFile[] = [];
  loadingFiles     = false;
  uploadingFiles   = false;
  errorMsg         = '';

  // ── Contadores por categoría ──
  filesCounts: Record<Category, number> = {
    graficos:      0,
    modelos:       0,
    planificacion: 0,
  };

  constructor(
    private router:  Router,
    private uploads: UploadsService,
    private cdr:     ChangeDetectorRef,
  ) {
    const user   = JSON.parse(localStorage.getItem('user') || 'null');
    const rolRaw = (user?.rol ?? '').toString();
    this.userRole = rolRaw.toUpperCase().replace(/\s+/g, '_').trim();
  }

  ngOnInit(): void {
    this.refreshAllCounts();
  }

  // ── Actualiza contadores de las 3 categorías ────────────────
  private refreshAllCounts(): void {
    (['graficos', 'modelos', 'planificacion'] as Category[]).forEach(cat => {
      this.uploads.listFiles(cat).subscribe({
        next:  files => (this.filesCounts[cat] = files.length),
        error: ()    => (this.filesCounts[cat] = 0),
      });
    });
  }

  // ── Navegación ──────────────────────────────────────────────
  goHome(): void {
    this.router.navigate(['/']);
  }

  // ── Modal ───────────────────────────────────────────────────
  openDocuments(category: Category): void {
    this.currentCategory = category;
    this.currentFiles    = [];
    this.errorMsg        = '';
    this.showModal       = true;
    this.loadFiles(category);
  }

  private loadFiles(category: Category): void {
    this.loadingFiles = true;
    this.cdr.detectChanges();
    this.uploads.listFiles(category).subscribe({
      next: files => {
        this.currentFiles = [...files];
        this.loadingFiles = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg     = 'Error al cargar los archivos. Intenta de nuevo.';
        this.loadingFiles = false;
        this.cdr.detectChanges();
      },
    });
  }

  closeModal(): void {
    this.showModal       = false;
    this.currentCategory = null;
    this.currentFiles    = [];
    this.errorMsg        = '';
  }

  getModalTitle(): string {
    const titles: Record<Category, string> = {
      graficos:      'Gráficos Docentes',
      modelos:       'Modelos de Trabajo',
      planificacion: 'Planificación',
    };
    return this.currentCategory ? titles[this.currentCategory] : '';
  }

  // ── Permisos ────────────────────────────────────────────────
  canUploadFiles():             boolean { return ALLOWED_ROLES_UPLOAD.has(this.userRole); }
  canDeleteFiles():             boolean { return ALLOWED_ROLES_UPLOAD.has(this.userRole); }
  canDownloadFile(_f: WorkspaceFile): boolean { return true; }

  // ── Subida ──────────────────────────────────────────────────
  triggerUpload(): void {
    this.fileInput?.nativeElement.click();
  }

  uploadFile(event: Event): void {
    if (!this.canUploadFiles() || !this.currentCategory) return;

    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (files.length === 0) return;

    this.uploadingFiles = true;
    this.errorMsg       = '';

    this.uploads.uploadFiles(this.currentCategory, files).subscribe({
      next: () => {
        this.uploadingFiles = false;
        input.value = '';
        this.loadFiles(this.currentCategory!);
        this.refreshAllCounts();
        this.cdr.detectChanges();
      },
      error: () => {
        this.uploadingFiles = false;
        this.errorMsg = 'Error al subir el archivo. Intenta de nuevo.';
        input.value = '';
        this.cdr.detectChanges();
      },
    });
  }

  // ── Descarga ────────────────────────────────────────────────
  downloadFile(file: WorkspaceFile): void {
    if (!this.currentCategory) return;

    this.uploads.downloadFile(this.currentCategory, file.name).subscribe({
      next: blob => {
        const url    = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href     = url;
        anchor.download = file.name;
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.errorMsg = 'Error al descargar el archivo.';
      },
    });
  }

  // ── Eliminar ────────────────────────────────────────────────
  deleteFile(filename: string): void {
    if (!this.canDeleteFiles() || !this.currentCategory) return;
    if (!confirm(`¿Estás seguro de que deseas eliminar "${filename}"?`)) return;

    this.uploads.deleteFile(this.currentCategory, filename).subscribe({
      next: () => {
        this.loadFiles(this.currentCategory!);
        this.refreshAllCounts();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Error al eliminar el archivo.';
        this.cdr.detectChanges();
      },
    });
  }

  // ── Utilidades para iconos ─────────────────────────────────
  // Determina si es documento Word (.doc o .docx)
  isWordFile(fileName: string): boolean {
    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
    return ext === 'doc' || ext === 'docx';
  }

  // Determina si es hoja de cálculo Excel (.xls o .xlsx o .csv)
  isExcelFile(fileName: string): boolean {
    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
    return ext === 'xls' || ext === 'xlsx' || ext === 'csv';
  }

  // Determina si es una imagen ()
  isPNGFile(fileName: string): boolean {
    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
    return ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif' || ext === 'webp';
  }

  // Determina si es pdf (.pdf)
  isPDFFile(fileName: string): boolean {
    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
    return ext === 'pdf';
  }

  // Determina si es Power Point (pptx)
  isPPFile(fileName: string): boolean {
    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
    return ext === 'ppt' || ext === 'pptx';
  }

  // Ruta del icono SVG para Word
  getWordIconPath(): string {
    return '/document.svg';   // ubicado en public/document.svg
  }

  // Ruta del icono SVG para Excel
  getExcelIconPath(): string {
    return '/excel.svg';      // ubicado en public/excel.svg
  }

  // Ruta del icono SVG para PNG
  getPNGIconPath(): string {
    return '/png.svg';      // ubicado en public/png.svg
  }
  
  // Ruta del icono SVG para PDF
  getPDFIconPath(): string {
    return '/pdf.svg';      // ubicado en public/pdf.svg
  }

  // Ruta del icono SVG para PPTX
  getPPIconPath(): string {
    return '/pptx.svg';      // ubicado en public/pptx.svg
  }

  // Ruta del icono SVG para ZIP y RAR
  getZIPconPath(): string {
    return '/zip.svg';      // ubicado en public/zip.svg
  }

  // Ruta del icono SVG para Txt
  getTxtconPath(): string {
    return '/txt.svg';      // ubicado en public/txt.svg
  }

  
  // Icono emoji para el resto de extensiones
  getEmojiIcon(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
    const icons: Record<string, string> = {
    };
    return icons[ext] ?? '📁';
  }

  // Método legacy (si se usa en algún otro lugar, lo dejamos pero no lo usaremos en la plantilla)
  getFileIcon(fileName: string): string {
    if (this.isWordFile(fileName)) return '📝';
    if (this.isExcelFile(fileName)) return '📊';
    return this.getEmojiIcon(fileName);
  }

  // ── Formateo ────────────────────────────────────────────────
  formatDate(isoString: string): string {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('es-ES', {
      day:    '2-digit',
      month:  'short',
      year:   'numeric',
      hour:   '2-digit',
      minute: '2-digit',
    });
  }

  formatSize(bytes: number): string {
    if (bytes < 1024)        return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}