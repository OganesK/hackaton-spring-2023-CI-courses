/*
  Warnings:

  - You are about to drop the column `projectPosterId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_projectPosterId_fkey";

-- DropIndex
DROP INDEX "Media_projectPosterId_key";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "projectPosterId";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "posterId" INTEGER;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
