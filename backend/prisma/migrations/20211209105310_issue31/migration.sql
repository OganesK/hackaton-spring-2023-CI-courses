/*
  Warnings:

  - You are about to drop the column `projectMediaUpdatedId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_projectMediaUpdatedId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "projectMediaUpdatedId";
