/*
  Warnings:

  - The `activityKind` column on the `CompanyUpdatedVariable` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `EventUpdatedVariable` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `ProjectUpdatedVariable` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CompanyUpdatedVariable" DROP COLUMN "activityKind",
ADD COLUMN     "activityKind" "companiesActivityKind";

-- AlterTable
ALTER TABLE "EventUpdatedVariable" DROP COLUMN "category",
ADD COLUMN     "category" "eventCategories";

-- AlterTable
ALTER TABLE "ProjectUpdatedVariable" DROP COLUMN "category",
ADD COLUMN     "category" "projectCategories";
