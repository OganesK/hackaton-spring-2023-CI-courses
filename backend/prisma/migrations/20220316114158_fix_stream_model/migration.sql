/*
  Warnings:

  - Added the required column `plannedAt` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plannedAt" TIMESTAMP(3) NOT NULL;
