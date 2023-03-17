-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_postID_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_articleID_fkey";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_articleID_fkey" FOREIGN KEY ("articleID") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
