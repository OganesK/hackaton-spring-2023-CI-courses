/*
  Warnings:

  - The values [busines] on the enum `companiesActivityKind` will be removed. If these variants are still used in the database, this will fail.
  - The values [busines] on the enum `eventCategories` will be removed. If these variants are still used in the database, this will fail.
  - The values [busines] on the enum `projectCategories` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Solution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolutionUpdatedVariable` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "companiesActivityKind_new" AS ENUM ('business', 'development', 'design', 'management', 'analytic');
ALTER TABLE "Company" ALTER COLUMN "activityKind" TYPE "companiesActivityKind_new" USING ("activityKind"::text::"companiesActivityKind_new");
ALTER TABLE "CompanyUpdatedVariable" ALTER COLUMN "activityKind" TYPE "companiesActivityKind_new" USING ("activityKind"::text::"companiesActivityKind_new");
ALTER TYPE "companiesActivityKind" RENAME TO "companiesActivityKind_old";
ALTER TYPE "companiesActivityKind_new" RENAME TO "companiesActivityKind";
DROP TYPE "companiesActivityKind_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "eventCategories_new" AS ENUM ('business', 'development', 'design', 'management', 'analytic');
ALTER TABLE "Event" ALTER COLUMN "category" TYPE "eventCategories_new" USING ("category"::text::"eventCategories_new");
ALTER TABLE "EventUpdatedVariable" ALTER COLUMN "category" TYPE "eventCategories_new" USING ("category"::text::"eventCategories_new");
ALTER TYPE "eventCategories" RENAME TO "eventCategories_old";
ALTER TYPE "eventCategories_new" RENAME TO "eventCategories";
DROP TYPE "eventCategories_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "projectCategories_new" AS ENUM ('business', 'development', 'design', 'management', 'analytic');
ALTER TABLE "Project" ALTER COLUMN "category" TYPE "projectCategories_new" USING ("category"::text::"projectCategories_new");
ALTER TABLE "ProjectUpdatedVariable" ALTER COLUMN "category" TYPE "projectCategories_new" USING ("category"::text::"projectCategories_new");
ALTER TYPE "projectCategories" RENAME TO "projectCategories_old";
ALTER TYPE "projectCategories_new" RENAME TO "projectCategories";
DROP TYPE "projectCategories_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_moderateId_fkey";

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_ownerCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_posterId_fkey";

-- DropForeignKey
ALTER TABLE "SolutionUpdatedVariable" DROP CONSTRAINT "SolutionUpdatedVariable_posterId_fkey";

-- DropForeignKey
ALTER TABLE "SolutionUpdatedVariable" DROP CONSTRAINT "SolutionUpdatedVariable_solutionId_fkey";

-- DropTable
DROP TABLE "Solution";

-- DropTable
DROP TABLE "SolutionUpdatedVariable";
