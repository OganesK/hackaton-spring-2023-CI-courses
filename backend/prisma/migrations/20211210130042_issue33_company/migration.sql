/*
  Warnings:

  - You are about to drop the column `companyId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_companyId_fkey";

-- DropIndex
DROP INDEX "Media_companyId_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "avatarId" INTEGER;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
