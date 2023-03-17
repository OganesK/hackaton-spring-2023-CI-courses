/*
  Warnings:

  - You are about to drop the column `posterId` on the `ProjectUpdatedVariable` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectPosterVariableId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProjectUpdatedVariable" DROP CONSTRAINT "ProjectUpdatedVariable_posterId_fkey";

-- DropIndex
DROP INDEX "ProjectUpdatedVariable_posterId_key";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "projectPosterVariableId" INTEGER;

-- AlterTable
ALTER TABLE "ProjectUpdatedVariable" DROP COLUMN "posterId";

-- CreateIndex
CREATE UNIQUE INDEX "Media_projectPosterVariableId_key" ON "Media"("projectPosterVariableId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectPosterVariableId_fkey" FOREIGN KEY ("projectPosterVariableId") REFERENCES "ProjectUpdatedVariable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
