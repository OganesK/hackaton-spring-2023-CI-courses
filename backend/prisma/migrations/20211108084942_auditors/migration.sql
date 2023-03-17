-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorID_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PlatformConfig" ALTER COLUMN "platformTagline" SET DATA TYPE TEXT,
ALTER COLUMN "platformDescription" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "rejectMessage" SET DATA TYPE TEXT,
ALTER COLUMN "authorID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
