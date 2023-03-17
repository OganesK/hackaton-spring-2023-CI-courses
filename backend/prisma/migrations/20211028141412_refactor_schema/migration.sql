/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Company` table. All the data in the column will be lost.
  - You are about to alter the column `avatar` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(128)`.
  - You are about to drop the column `adress` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Event` table. All the data in the column will be lost.
  - You are about to alter the column `poster` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(128)`.
  - You are about to drop the column `totalProjectsCount` on the `PlatformConfig` table. All the data in the column will be lost.
  - You are about to alter the column `platformTagline` on the `PlatformConfig` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `platformTitle` on the `PlatformConfig` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `platformShortDescription` on the `PlatformConfig` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `platformDescription` on the `PlatformConfig` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to drop the column `atachments` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `auditerId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isChecked` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `rejectMessage` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to drop the column `companyId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `metricsId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `videoPresentation` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `ProjectMetrics` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(128)`.
  - You are about to drop the column `projectId` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Worker` table. All the data in the column will be lost.
  - You are about to alter the column `position` on the `Worker` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(128)`.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Offer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NewsToPlatformConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectMetricsToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ownerCompanyID]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectID]` on the table `ProjectMetrics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerID` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerCompanyID` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerID` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalProjectCount` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auditorID` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorID` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectID` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerCompanyID` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectID` to the `ProjectMetrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `projectID` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workerID` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "postCategory" AS ENUM ('news', 'resource', 'offer');

-- CreateEnum
CREATE TYPE "workerRole" AS ENUM ('administrator', 'moderator', 'worker');

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_authorId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_auditerId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMetrics" DROP CONSTRAINT "ProjectMetrics_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_userId_fkey";

-- DropForeignKey
ALTER TABLE "_NewsToPlatformConfig" DROP CONSTRAINT "_NewsToPlatformConfig_A_fkey";

-- DropForeignKey
ALTER TABLE "_NewsToPlatformConfig" DROP CONSTRAINT "_NewsToPlatformConfig_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectMetricsToUser" DROP CONSTRAINT "_ProjectMetricsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectMetricsToUser" DROP CONSTRAINT "_ProjectMetricsToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_B_fkey";

-- DropIndex
DROP INDEX "ProjectMetrics_projectId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "ownerId",
ADD COLUMN     "ownerID" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "avatar" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "activityKind" DROP NOT NULL,
ALTER COLUMN "activityKind" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "adress",
DROP COLUMN "companyId",
DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "adresses" VARCHAR(256)[],
ADD COLUMN     "emails" VARCHAR(64)[],
ADD COLUMN     "ownerCompanyID" INTEGER NOT NULL,
ADD COLUMN     "phones" VARCHAR(64)[];

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "authorId",
ADD COLUMN     "organizerID" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "poster" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "PlatformConfig" DROP COLUMN "totalProjectsCount",
ADD COLUMN     "totalProjectCount" INTEGER NOT NULL,
ALTER COLUMN "totalInvestments" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "platformTagline" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "platformTitle" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "platformShortDescription" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "platformDescription" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "atachments",
DROP COLUMN "auditerId",
DROP COLUMN "authorId",
DROP COLUMN "isChecked",
DROP COLUMN "projectId",
ADD COLUMN     "attachments" VARCHAR(128)[],
ADD COLUMN     "auditorID" INTEGER NOT NULL,
ADD COLUMN     "authorID" INTEGER NOT NULL,
ADD COLUMN     "category" "postCategory" NOT NULL,
ADD COLUMN     "description" VARCHAR(128) NOT NULL,
ADD COLUMN     "poster" VARCHAR(128) NOT NULL,
ADD COLUMN     "projectID" INTEGER NOT NULL,
ADD COLUMN     "tags" VARCHAR(64)[],
ADD COLUMN     "title" VARCHAR(128) NOT NULL,
ALTER COLUMN "body" SET DATA TYPE TEXT,
ALTER COLUMN "isApproved" DROP NOT NULL,
ALTER COLUMN "isApproved" DROP DEFAULT,
ALTER COLUMN "rejectMessage" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "companyId",
DROP COLUMN "images",
DROP COLUMN "metricsId",
DROP COLUMN "videoPresentation",
ADD COLUMN     "category" VARCHAR(128) NOT NULL,
ADD COLUMN     "ownerCompanyID" INTEGER NOT NULL,
ADD COLUMN     "presentationMedia" VARCHAR(256)[],
ALTER COLUMN "name" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "ProjectMetrics" DROP COLUMN "projectId",
ADD COLUMN     "projectID" INTEGER NOT NULL,
ALTER COLUMN "earned" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "investmentsGot" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "body" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" VARCHAR(128) NOT NULL,
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "login" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "bio" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "projectId",
DROP COLUMN "userId",
ADD COLUMN     "projectID" INTEGER NOT NULL,
ADD COLUMN     "role" "workerRole" NOT NULL,
ADD COLUMN     "workerID" INTEGER NOT NULL,
ALTER COLUMN "position" SET DATA TYPE VARCHAR(128);

-- DropTable
DROP TABLE "News";

-- DropTable
DROP TABLE "Offer";

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "_NewsToPlatformConfig";

-- DropTable
DROP TABLE "_ProjectMetricsToUser";

-- DropTable
DROP TABLE "_ProjectToUser";

-- CreateTable
CREATE TABLE "_PlatformConfigToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlatformConfigToPost_AB_unique" ON "_PlatformConfigToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_PlatformConfigToPost_B_index" ON "_PlatformConfigToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_ownerCompanyID_key" ON "Contact"("ownerCompanyID");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMetrics_projectID_key" ON "ProjectMetrics"("projectID");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_ownerCompanyID_fkey" FOREIGN KEY ("ownerCompanyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerCompanyID_fkey" FOREIGN KEY ("ownerCompanyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMetrics" ADD CONSTRAINT "ProjectMetrics_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_workerID_fkey" FOREIGN KEY ("workerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_auditorID_fkey" FOREIGN KEY ("auditorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerID_fkey" FOREIGN KEY ("organizerID") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformConfigToPost" ADD FOREIGN KEY ("A") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformConfigToPost" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
