-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'DECANO_VICEDECANO', 'JEFE_DEPARTAMENTO', 'PPA', 'PROFESOR');

-- CreateEnum
CREATE TYPE "Modalidad" AS ENUM ('DIURNO', 'ENCUENTRO');

-- CreateEnum
CREATE TYPE "estadoTarea" AS ENUM ('COMPLETADA', 'RECHAZADA', 'EN_REVIsION', 'PENDIENTE');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT,
    "rol" "Rol" NOT NULL,
    "apellido" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Colectivo" (
    "colectivoId" TEXT NOT NULL,
    "nombreColectivo" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "modalidad" "Modalidad" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Colectivo_pkey" PRIMARY KEY ("colectivoId")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "tareaId" TEXT NOT NULL,
    "nombreTarea" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaLimite" TIMESTAMP(3) NOT NULL,
    "estado" "estadoTarea" NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("tareaId")
);
