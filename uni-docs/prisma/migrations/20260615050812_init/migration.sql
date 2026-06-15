/*
  Warnings:

  - Added the required column `periodo` to the `Colectivo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Periodo" AS ENUM ('PRIMERO', 'SEGUNDO');

-- AlterTable
ALTER TABLE "Colectivo" ADD COLUMN     "periodo" "Periodo" NOT NULL;
