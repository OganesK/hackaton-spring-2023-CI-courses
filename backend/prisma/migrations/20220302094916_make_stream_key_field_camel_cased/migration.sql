/*
  Warnings:

  - You are about to drop the column `stream_key` on the `Stream` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[streamKey]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - The required column `streamKey` was added to the `Stream` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Stream_stream_key_key";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "stream_key",
ADD COLUMN     "streamKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stream_streamKey_key" ON "Stream"("streamKey");
