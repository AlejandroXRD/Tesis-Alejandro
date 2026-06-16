// src/uploads/uploads.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export type Category = 'graficos' | 'modelos' | 'planificacion';

const CATEGORY_FOLDERS: Record<Category, string> = {
  graficos:     'Graficos',
  modelos:      'Modelos',
  planificacion:'Planificacion',
};

// Ruta base: ./Uploads  (relativa a donde arranca NestJS, es decir la raíz del proyecto)
const BASE_PATH = path.resolve(process.cwd(), 'Uploads');

export interface FileMetadata {
  name:       string;
  category:   Category;
  uploadedAt: string;   // ISO string
  sizeBytes:  number;
}

@Injectable()
export class UploadsService {

  constructor() {
    // Crear carpetas si no existen al iniciar el servicio
    Object.values(CATEGORY_FOLDERS).forEach(folder => {
      const dir = path.join(BASE_PATH, folder);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  // ── Validación ──────────────────────────────────────────────
  validateCategory(category: string): void {
    if (!Object.keys(CATEGORY_FOLDERS).includes(category)) {
      throw new BadRequestException(
        `Categoría inválida: "${category}". Use: graficos, modelos o planificacion.`,
      );
    }
  }

  // ── Ruta de carpeta ─────────────────────────────────────────
  private getCategoryDir(category: Category): string {
    return path.join(BASE_PATH, CATEGORY_FOLDERS[category]);
  }

  // ── Guardar archivos ────────────────────────────────────────
  saveFiles(category: Category, files: Express.Multer.File[]): FileMetadata[] {
    const dir = this.getCategoryDir(category);
    const saved: FileMetadata[] = [];

    files.forEach(file => {
      // Sanitizar nombre para evitar path traversal
      const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._\-\u00C0-\u024F ]/g, '_');
      const destPath = path.join(dir, safeName);

      fs.writeFileSync(destPath, file.buffer);

      saved.push({
        name:       safeName,
        category,
        uploadedAt: new Date().toISOString(),
        sizeBytes:  file.size,
      });
    });

    return saved;
  }

  // ── Listar archivos ─────────────────────────────────────────
  listFiles(category: Category): FileMetadata[] {
    const dir = this.getCategoryDir(category);

    if (!fs.existsSync(dir)) return [];

    return fs
      .readdirSync(dir)
      .filter(name => {
        const full = path.join(dir, name);
        return fs.statSync(full).isFile();
      })
      .map(name => {
        const full  = path.join(dir, name);
        const stats = fs.statSync(full);
        return {
          name,
          category,
          uploadedAt: stats.mtime.toISOString(),
          sizeBytes:  stats.size,
        };
      })
      .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)); // más reciente primero
  }

  // ── Ruta absoluta de un archivo ─────────────────────────────
  getFilePath(category: Category, filename: string): string | null {
    const safeName = path.basename(filename); // evitar path traversal
    const filePath = path.join(this.getCategoryDir(category), safeName);
    return fs.existsSync(filePath) ? filePath : null;
  }

  // ── Eliminar archivo ────────────────────────────────────────
  deleteFile(category: Category, filename: string): void {
    const safeName = path.basename(filename);
    const filePath = path.join(this.getCategoryDir(category), safeName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Archivo "${safeName}" no encontrado.`);
    }

    fs.unlinkSync(filePath);
  }
}