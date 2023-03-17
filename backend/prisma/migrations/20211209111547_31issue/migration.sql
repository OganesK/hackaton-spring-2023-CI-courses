-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "projectMediaUpdatedId" INTEGER;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectMediaUpdatedId_fkey" FOREIGN KEY ("projectMediaUpdatedId") REFERENCES "ProjectUpdatedVariable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
