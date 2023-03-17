/*
  Warnings:

  - The values [link] on the enum `sectionTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "sectionTypes_new" AS ENUM ('text', 'image', 'video');
ALTER TABLE "Section" ALTER COLUMN "type" TYPE "sectionTypes_new" USING ("type"::text::"sectionTypes_new");
ALTER TYPE "sectionTypes" RENAME TO "sectionTypes_old";
ALTER TYPE "sectionTypes_new" RENAME TO "sectionTypes";
DROP TYPE "sectionTypes_old";
COMMIT;
