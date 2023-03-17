/*
  Warnings:

  - Added the required column `name` to the `Communication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Communication" ADD COLUMN     "name" VARCHAR(64) NOT NULL;
