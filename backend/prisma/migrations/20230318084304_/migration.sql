/*
  Warnings:

  - You are about to drop the column `eventId` on the `Stream` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "sectionTypes" ADD VALUE 'audio';
ALTER TYPE "sectionTypes" ADD VALUE 'doc';
ALTER TYPE "sectionTypes" ADD VALUE 'pdf';

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_eventId_fkey";

-- DropForeignKey
ALTER TABLE "StreamMessage" DROP CONSTRAINT "StreamMessage_streamId_fkey";

-- DropIndex
DROP INDEX "Stream_eventId_key";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "eventId",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT E'Stream',
ALTER COLUMN "active" SET DEFAULT true;
