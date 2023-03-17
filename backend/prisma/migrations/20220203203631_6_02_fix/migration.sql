/*
  Warnings:

  - You are about to drop the column `involvedProjectId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `organizerID` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the `CompanyUpdatedVariable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactUpdatedVariable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventUpdatedVariable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostUpdatedVariable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectUpdatedVariable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserUpdatedVariable` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizer` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyUpdatedVariable" DROP CONSTRAINT "CompanyUpdatedVariable_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyUpdatedVariable" DROP CONSTRAINT "CompanyUpdatedVariable_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ContactUpdatedVariable" DROP CONSTRAINT "ContactUpdatedVariable_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_involvedProjectId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organizerID_fkey";

-- DropForeignKey
ALTER TABLE "EventUpdatedVariable" DROP CONSTRAINT "EventUpdatedVariable_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventUpdatedVariable" DROP CONSTRAINT "EventUpdatedVariable_involvedProjectId_fkey";

-- DropForeignKey
ALTER TABLE "EventUpdatedVariable" DROP CONSTRAINT "EventUpdatedVariable_posterId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_projectMediaVariableId_fkey";

-- DropForeignKey
ALTER TABLE "PostUpdatedVariable" DROP CONSTRAINT "PostUpdatedVariable_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostUpdatedVariable" DROP CONSTRAINT "PostUpdatedVariable_posterId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUpdatedVariable" DROP CONSTRAINT "ProjectUpdatedVariable_posterId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUpdatedVariable" DROP CONSTRAINT "ProjectUpdatedVariable_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserUpdatedVariable" DROP CONSTRAINT "UserUpdatedVariable_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "UserUpdatedVariable" DROP CONSTRAINT "UserUpdatedVariable_userId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "name" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "shortDescription" DROP NOT NULL,
ALTER COLUMN "shortDescription" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "emails" SET DATA TYPE VARCHAR(512)[],
ALTER COLUMN "phones" SET DATA TYPE VARCHAR(512)[];

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "involvedProjectId",
DROP COLUMN "organizerID",
ADD COLUMN     "address" VARCHAR(512) NOT NULL,
ADD COLUMN     "organizer" VARCHAR(512) NOT NULL,
ADD COLUMN     "theme" VARCHAR(512) NOT NULL,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "shortDescription" SET DATA TYPE TEXT,
ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "url" SET DATA TYPE VARCHAR(512);

-- AlterTable
ALTER TABLE "MessagerGroup" ALTER COLUMN "title" SET DATA TYPE VARCHAR(512);

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "theme" SET DATA TYPE VARCHAR(512);

-- AlterTable
ALTER TABLE "PlatformConfig" ALTER COLUMN "platformTitle" SET DATA TYPE TEXT,
ALTER COLUMN "platformShortDescription" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "tags" SET DATA TYPE VARCHAR(512)[],
ALTER COLUMN "title" SET DATA TYPE VARCHAR(512);

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "name" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "shortDescription" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "login" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(512);

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "role",
ALTER COLUMN "position" SET DATA TYPE VARCHAR(512);

-- DropTable
DROP TABLE "CompanyUpdatedVariable";

-- DropTable
DROP TABLE "ContactUpdatedVariable";

-- DropTable
DROP TABLE "EventUpdatedVariable";

-- DropTable
DROP TABLE "PostUpdatedVariable";

-- DropTable
DROP TABLE "ProjectUpdatedVariable";

-- DropTable
DROP TABLE "UserUpdatedVariable";

-- DropEnum
DROP TYPE "workerRole";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
