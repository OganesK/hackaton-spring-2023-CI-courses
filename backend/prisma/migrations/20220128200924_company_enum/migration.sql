/*
  Warnings:

  - The `activityKind` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "companiesActivityKind" AS ENUM ('busines', 'development', 'design', 'management', 'analytic');

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "activityKind",
ADD COLUMN     "activityKind" "companiesActivityKind";
