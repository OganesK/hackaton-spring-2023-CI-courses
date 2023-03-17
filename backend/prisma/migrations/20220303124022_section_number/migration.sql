/*
  Warnings:

  - Added the required column `number` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "number" INTEGER NOT NULL;
