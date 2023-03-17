-- AlterTable
ALTER TABLE "MessagerGroup" ADD COLUMN     "adminId" INTEGER;

-- AddForeignKey
ALTER TABLE "MessagerGroup" ADD CONSTRAINT "MessagerGroup_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
