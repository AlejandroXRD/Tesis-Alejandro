-- AlterTable
ALTER TABLE "Tarea" ADD COLUMN     "comentario" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "rol" SET DEFAULT 'NUEVO_USUARIO';
