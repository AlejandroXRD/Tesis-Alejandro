-- AlterEnum
BEGIN;
CREATE TYPE "Rol_new" AS ENUM ('ADMIN', 'DECANO_VICEDECANO', 'JEFE_DEPARTAMENTO', 'PPA', 'PROFESOR', 'NUEVO_USUARIO');

-- Eliminar el default ANTES de cambiar el tipo
ALTER TABLE "User" ALTER COLUMN "rol" DROP DEFAULT;

ALTER TABLE "User" ALTER COLUMN "rol" TYPE "Rol_new" USING ("rol"::text::"Rol_new");
ALTER TYPE "Rol" RENAME TO "Rol_old";
ALTER TYPE "Rol_new" RENAME TO "Rol";
DROP TYPE "Rol_old";

-- Restaurar el default DESPUÉS (ajustá el valor si corresponde)
ALTER TABLE "User" ALTER COLUMN "rol" SET DEFAULT 'NUEVO_USUARIO'::"Rol";

COMMIT;