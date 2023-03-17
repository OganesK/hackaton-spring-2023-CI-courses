-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "involvedProjectId" INTEGER;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_involvedProjectId_fkey" FOREIGN KEY ("involvedProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
