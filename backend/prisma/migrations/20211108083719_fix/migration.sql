/*
  Warnings:

  - Added the required column `poster` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PlatformConfig" ALTER COLUMN "platformTagline" SET DATA TYPE TEXT,
ALTER COLUMN "platformDescription" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "rejectMessage" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "poster" VARCHAR(128) NOT NULL;
