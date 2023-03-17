/*
  Warnings:

  - You are about to drop the column `fontColor` on the `SectionAtributes` table. All the data in the column will be lost.
  - You are about to drop the column `fontFamily` on the `SectionAtributes` table. All the data in the column will be lost.
  - You are about to drop the column `fontSize` on the `SectionAtributes` table. All the data in the column will be lost.
  - You are about to drop the column `fontWeight` on the `SectionAtributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SectionAtributes" DROP COLUMN "fontColor",
DROP COLUMN "fontFamily",
DROP COLUMN "fontSize",
DROP COLUMN "fontWeight",
ADD COLUMN     "isBold" BOOLEAN,
ADD COLUMN     "isItalic" BOOLEAN,
ADD COLUMN     "isStrike" BOOLEAN;
