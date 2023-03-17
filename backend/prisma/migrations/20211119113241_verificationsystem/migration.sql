/*
  Warnings:

  - You are about to drop the column `auditorID` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moderateId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[moderateId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[moderateId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[moderateId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[moderateId]` on the table `Solution` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_auditorID_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "moderateId" INTEGER;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "moderateId" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "auditorID",
ADD COLUMN     "moderateId" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "moderateId" INTEGER;

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "moderateId" INTEGER;

-- CreateTable
CREATE TABLE "Moderate" (
    "id" SERIAL NOT NULL,
    "moderatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auditorId" INTEGER,

    CONSTRAINT "Moderate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_moderateId_key" ON "Company"("moderateId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_moderateId_key" ON "Contact"("moderateId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_moderateId_key" ON "Post"("moderateId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_moderateId_key" ON "Project"("moderateId");

-- CreateIndex
CREATE UNIQUE INDEX "Solution_moderateId_key" ON "Solution"("moderateId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moderate" ADD CONSTRAINT "Moderate_auditorId_fkey" FOREIGN KEY ("auditorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
