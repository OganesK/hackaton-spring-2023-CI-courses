/*
  Warnings:

  - You are about to drop the column `investmentBudget` on the `PlatformConfig` table. All the data in the column will be lost.
  - You are about to drop the column `investmentExtrabudgetary` on the `PlatformConfig` table. All the data in the column will be lost.
  - You are about to drop the column `startupCompanyCount` on the `PlatformConfig` table. All the data in the column will be lost.
  - You are about to drop the column `startupProjectsCount` on the `PlatformConfig` table. All the data in the column will be lost.
  - Added the required column `totalBudgetInvestment` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCompanyCount` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExtraBudgetInvestment` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalProjectCount` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlatformConfig" DROP COLUMN "investmentBudget",
DROP COLUMN "investmentExtrabudgetary",
DROP COLUMN "startupCompanyCount",
DROP COLUMN "startupProjectsCount",
ADD COLUMN     "totalBudgetInvestment" INTEGER NOT NULL,
ADD COLUMN     "totalCompanyCount" INTEGER NOT NULL,
ADD COLUMN     "totalExtraBudgetInvestment" INTEGER NOT NULL,
ADD COLUMN     "totalProjectCount" INTEGER NOT NULL;
