/*
  Warnings:

  - Made the column `activityKind` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "activityKind" SET NOT NULL,
ALTER COLUMN "activityKind" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;
