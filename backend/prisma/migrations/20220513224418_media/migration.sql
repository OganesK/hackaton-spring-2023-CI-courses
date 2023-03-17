-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "crowdfundingStoryId" INTEGER,
ADD COLUMN     "projectDescriptionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectDescriptionId_fkey" FOREIGN KEY ("projectDescriptionId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_crowdfundingStoryId_fkey" FOREIGN KEY ("crowdfundingStoryId") REFERENCES "CrowdFunding"("id") ON DELETE SET NULL ON UPDATE CASCADE;
