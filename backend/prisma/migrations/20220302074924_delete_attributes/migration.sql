/*
  Warnings:

  - You are about to drop the `SectionAtributes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SectionAtributes" DROP CONSTRAINT "SectionAtributes_sectionId_fkey";

-- DropTable
DROP TABLE "SectionAtributes";
