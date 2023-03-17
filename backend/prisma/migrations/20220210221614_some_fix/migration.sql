/*
  Warnings:

  - The `activityKind` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "filteringCategories" AS ENUM ('business', 'development', 'design', 'management', 'analytic');

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "activityKind",
ADD COLUMN     "activityKind" "filteringCategories";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "category",
ADD COLUMN     "category" "filteringCategories";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "filteringCategories";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "category",
ADD COLUMN     "category" "filteringCategories";

-- DropEnum
DROP TYPE "companiesActivityKind";

-- DropEnum
DROP TYPE "eventCategories";

-- DropEnum
DROP TYPE "projectCategories";
