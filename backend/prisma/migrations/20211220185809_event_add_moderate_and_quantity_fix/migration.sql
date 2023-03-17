/*
  Warnings:

  - A unique constraint covering the columns `[moderateId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "name" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "CompanyUpdatedVariable" ALTER COLUMN "name" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "activityKind" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "adresses" SET DATA TYPE VARCHAR(512)[],
ALTER COLUMN "emails" SET DATA TYPE VARCHAR(128)[];

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "moderateId" INTEGER,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "theme" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "PlatformConfig" ALTER COLUMN "platformShortDescription" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "description" SET DATA TYPE VARCHAR(512),
ALTER COLUMN "tags" SET DATA TYPE VARCHAR(128)[],
ALTER COLUMN "title" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "articleBody" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "name" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "ProjectUpdatedVariable" ALTER COLUMN "name" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "name" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "Worker" ALTER COLUMN "position" SET DATA TYPE VARCHAR(256);

-- CreateIndex
CREATE UNIQUE INDEX "Event_moderateId_key" ON "Event"("moderateId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
