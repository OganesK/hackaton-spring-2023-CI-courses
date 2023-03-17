/*
  Warnings:

  - Added the required column `totalMembers` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalProceeds` to the `PlatformConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlatformConfig" ADD COLUMN     "totalMembers" INTEGER NOT NULL,
ADD COLUMN     "totalProceeds" INTEGER NOT NULL;
