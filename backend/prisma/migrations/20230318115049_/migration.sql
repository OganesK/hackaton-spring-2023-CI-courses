/*
  Warnings:

  - You are about to drop the column `authorID` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `courseID` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isNews` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_newsOnLanding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_offersOnLanding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_courseID_fkey";

-- DropForeignKey
ALTER TABLE "_newsOnLanding" DROP CONSTRAINT "_newsOnLanding_A_fkey";

-- DropForeignKey
ALTER TABLE "_newsOnLanding" DROP CONSTRAINT "_newsOnLanding_B_fkey";

-- DropForeignKey
ALTER TABLE "_offersOnLanding" DROP CONSTRAINT "_offersOnLanding_A_fkey";

-- DropForeignKey
ALTER TABLE "_offersOnLanding" DROP CONSTRAINT "_offersOnLanding_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorID",
DROP COLUMN "courseID",
DROP COLUMN "isNews",
DROP COLUMN "tags";

-- DropTable
DROP TABLE "_newsOnLanding";

-- DropTable
DROP TABLE "_offersOnLanding";
