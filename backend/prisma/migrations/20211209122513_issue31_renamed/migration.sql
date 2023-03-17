/*
  Warnings:

  - You are about to drop the column `projectMediaUpdatedId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_projectMediaUpdatedId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "projectMediaUpdatedId",
ADD COLUMN     "projectMediaVariableId" INTEGER;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectMediaVariableId_fkey" FOREIGN KEY ("projectMediaVariableId") REFERENCES "ProjectUpdatedVariable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
