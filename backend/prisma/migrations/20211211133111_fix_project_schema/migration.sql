/*
  Warnings:

  - You are about to drop the column `projectPosterVariableId` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[posterId]` on the table `ProjectUpdatedVariable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_projectPosterVariableId_fkey";

-- DropIndex
DROP INDEX "Media_projectPosterVariableId_key";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "projectPosterVariableId";

-- AlterTable
ALTER TABLE "ProjectUpdatedVariable" ADD COLUMN     "posterId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUpdatedVariable_posterId_key" ON "ProjectUpdatedVariable"("posterId");

-- AddForeignKey
ALTER TABLE "ProjectUpdatedVariable" ADD CONSTRAINT "ProjectUpdatedVariable_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
