/*
  Warnings:

  - Added the required column `userId` to the `Tarea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tarea" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ColectivoProfesor" (
    "colectivoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "asignatura" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ColectivoProfesor_pkey" PRIMARY KEY ("colectivoId","userId")
);

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColectivoProfesor" ADD CONSTRAINT "ColectivoProfesor_colectivoId_fkey" FOREIGN KEY ("colectivoId") REFERENCES "Colectivo"("colectivoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColectivoProfesor" ADD CONSTRAINT "ColectivoProfesor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
