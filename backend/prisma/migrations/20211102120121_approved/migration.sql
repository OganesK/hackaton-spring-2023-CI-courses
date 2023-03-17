/*
  Warnings:

  - You are about to drop the column `attachments` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_projectID_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "isApproved" BOOLEAN;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "attachments",
ALTER COLUMN "projectID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isApproved" BOOLEAN;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
