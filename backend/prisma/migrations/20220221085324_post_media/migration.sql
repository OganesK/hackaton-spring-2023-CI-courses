-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "postMediaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postMediaId_fkey" FOREIGN KEY ("postMediaId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
