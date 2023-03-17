/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `articleBody` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "articleBody" TEXT NOT NULL;

-- DropTable
DROP TABLE "Article";
