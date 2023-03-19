/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('administrator', 'user', 'creator');

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_courseDescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_courseMediaId_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToPlatformConfig" DROP CONSTRAINT "_CourseToPlatformConfig_A_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_posterId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT E'administrator';

-- DropTable
DROP TABLE "course";

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(512) NOT NULL,
    "posterId" INTEGER,
    "shortDescription" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "courseType" "courseTypeEnum",

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_courseMediaId_fkey" FOREIGN KEY ("courseMediaId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_courseDescriptionId_fkey" FOREIGN KEY ("courseDescriptionId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToPlatformConfig" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
