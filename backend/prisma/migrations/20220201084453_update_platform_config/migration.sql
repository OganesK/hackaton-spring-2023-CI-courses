/*
  Warnings:

  - You are about to drop the column `totalInvestments` on the `PlatformConfig` table. All the data in the column will be lost.
  - You are about to drop the column `totalMembers` on the `PlatformConfig` table. All the data in the column will be lost.
  - You are about to drop the column `totalPartnersCount` on the `PlatformConfig` table. All the data in the column will be lost.
  - You are about to drop the column `totalProceeds` on the `PlatformConfig` table. All the data in the column will be lost.
  - You are about to drop the column `totalProjectCount` on the `PlatformConfig` table. All the data in the column will be lost.
  - Added the required column `investmentBudget` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investmentExtrabudgetary` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startupCompanyCount` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startupProjectsCount` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlatformConfig" DROP COLUMN "totalInvestments",
DROP COLUMN "totalMembers",
DROP COLUMN "totalPartnersCount",
DROP COLUMN "totalProceeds",
DROP COLUMN "totalProjectCount",
ADD COLUMN     "investmentBudget" INTEGER NOT NULL,
ADD COLUMN     "investmentExtrabudgetary" INTEGER NOT NULL,
ADD COLUMN     "startupCompanyCount" INTEGER NOT NULL,
ADD COLUMN     "startupProjectsCount" INTEGER NOT NULL;
