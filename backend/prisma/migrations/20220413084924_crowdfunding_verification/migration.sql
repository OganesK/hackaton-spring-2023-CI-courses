/*
  Warnings:

  - A unique constraint covering the columns `[moderateId]` on the table `CrowdFunding` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CrowdFunding" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderateId" INTEGER,
ADD COLUMN     "moderationChecked" BOOLEAN DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "CrowdFunding_moderateId_key" ON "CrowdFunding"("moderateId");

-- AddForeignKey
ALTER TABLE "CrowdFunding" ADD CONSTRAINT "CrowdFunding_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
