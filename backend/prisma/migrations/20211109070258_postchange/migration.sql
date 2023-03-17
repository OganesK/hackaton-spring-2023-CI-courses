/*
  Warnings:

  - You are about to drop the column `category` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "category",
ADD COLUMN     "isNews" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOffer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isResource" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "postCategory";
