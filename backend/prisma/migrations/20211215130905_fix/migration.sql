/*
  Warnings:

  - You are about to drop the column `eventId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `solutionId` on the `Media` table. All the data in the column will be lost.
  - Added the required column `posterId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterId` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_solutionId_fkey";

-- DropIndex
DROP INDEX "Media_eventId_key";

-- DropIndex
DROP INDEX "Media_solutionId_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "posterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "eventId",
DROP COLUMN "solutionId";

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "posterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
