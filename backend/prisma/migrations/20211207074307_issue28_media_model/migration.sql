/*
  Warnings:

  - You are about to drop the column `avatar` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `presentationMedia` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "mediaType" AS ENUM ('image', 'video');

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "poster";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "poster";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "poster",
DROP COLUMN "presentationMedia";

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "poster";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar";

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR(256) NOT NULL,
    "type" "mediaType" NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "eventId" INTEGER,
    "postId" INTEGER,
    "solutionId" INTEGER,
    "projectPosterId" INTEGER,
    "projectMediaId" INTEGER,
    "companyId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Media_eventId_key" ON "Media"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_postId_key" ON "Media"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_solutionId_key" ON "Media"("solutionId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_projectPosterId_key" ON "Media"("projectPosterId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_companyId_key" ON "Media"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_userId_key" ON "Media"("userId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectPosterId_fkey" FOREIGN KEY ("projectPosterId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectMediaId_fkey" FOREIGN KEY ("projectMediaId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
