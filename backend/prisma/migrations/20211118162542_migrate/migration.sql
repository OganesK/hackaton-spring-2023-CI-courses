/*
  Warnings:

  - Made the column `isApproved` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isApproved` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isApproved` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "isApproved" SET NOT NULL,
ALTER COLUMN "isApproved" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "isApproved" SET NOT NULL,
ALTER COLUMN "isApproved" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "isApproved" SET NOT NULL,
ALTER COLUMN "isApproved" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
