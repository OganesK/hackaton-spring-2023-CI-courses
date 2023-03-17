/*
  Warnings:

  - You are about to drop the column `adminId` on the `MessagerGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessagerGroup" DROP CONSTRAINT "MessagerGroup_adminId_fkey";

-- AlterTable
ALTER TABLE "MessagerGroup" DROP COLUMN "adminId";

-- CreateTable
CREATE TABLE "_admin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_admin_AB_unique" ON "_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- AddForeignKey
ALTER TABLE "_admin" ADD FOREIGN KEY ("A") REFERENCES "MessagerGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
