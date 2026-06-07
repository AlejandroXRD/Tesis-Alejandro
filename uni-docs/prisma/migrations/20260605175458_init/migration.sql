/*
  Warnings:

  - The values [RECHAZADA,EN_REVIsION] on the enum `estadoTarea` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "estadoTarea_new" AS ENUM ('PENDIENTE', 'EN_REVISION', 'COMPLETADA', 'CANCELADA');
ALTER TABLE "Tarea" ALTER COLUMN "estado" TYPE "estadoTarea_new" USING ("estado"::text::"estadoTarea_new");
ALTER TYPE "estadoTarea" RENAME TO "estadoTarea_old";
ALTER TYPE "estadoTarea_new" RENAME TO "estadoTarea";
DROP TYPE "public"."estadoTarea_old";
COMMIT;

-- AlterTable
ALTER TABLE "Tarea" ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "rol" SET DEFAULT 'PROFESOR';

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
