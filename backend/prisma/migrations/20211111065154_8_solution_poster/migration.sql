/*
  Warnings:

  - Added the required column `poster` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "poster" VARCHAR(128) NOT NULL;
