-- AlterTable
ALTER TABLE "MessagerGroup" ADD COLUMN     "avatarId" INTEGER;

-- AddForeignKey
ALTER TABLE "MessagerGroup" ADD CONSTRAINT "MessagerGroup_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
