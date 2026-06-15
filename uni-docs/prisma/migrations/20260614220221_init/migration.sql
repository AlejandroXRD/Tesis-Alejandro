/*
  Warnings:

  - The values [CANCELADA] on the enum `estadoTarea` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `Tarea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "estadoTarea_new" AS ENUM ('PENDIENTE', 'EN_REVISION', 'COMPLETADA', 'RECHAZADA');
ALTER TABLE "public"."Tarea" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Tarea" ALTER COLUMN "estado" TYPE "estadoTarea_new" USING ("estado"::text::"estadoTarea_new");
ALTER TYPE "estadoTarea" RENAME TO "estadoTarea_old";
ALTER TYPE "estadoTarea_new" RENAME TO "estadoTarea";
DROP TYPE "public"."estadoTarea_old";
ALTER TABLE "Tarea" ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE';
COMMIT;

-- AlterTable
ALTER TABLE "Tarea" ADD COLUMN     "archivo" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "rol" SET DEFAULT 'PROFESOR';
