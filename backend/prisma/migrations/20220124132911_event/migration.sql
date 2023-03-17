-- AlterTable
ALTER TABLE "EventUpdatedVariable" ADD COLUMN     "involvedProjectId" INTEGER;

-- AddForeignKey
ALTER TABLE "EventUpdatedVariable" ADD CONSTRAINT "EventUpdatedVariable_involvedProjectId_fkey" FOREIGN KEY ("involvedProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
