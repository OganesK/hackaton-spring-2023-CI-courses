/*
  Warnings:

  - Changed the type of `category` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "projectCategories" AS ENUM ('busines', 'development', 'design', 'management', 'analytic');

-- CreateEnum
CREATE TYPE "eventCategories" AS ENUM ('busines', 'development', 'design', 'management', 'analytic');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "category",
ADD COLUMN     "category" "eventCategories" NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "category",
ADD COLUMN     "category" "projectCategories" NOT NULL;
