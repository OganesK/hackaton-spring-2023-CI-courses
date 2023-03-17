/*
  Warnings:

  - A unique constraint covering the columns `[cfId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "cfId" INTEGER,
ALTER COLUMN "postID" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CrowdFunding" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(512) NOT NULL,
    "shortDescription" VARCHAR(512) NOT NULL,
    "posterId" INTEGER,
    "projectId" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "goalSum" DOUBLE PRECISION NOT NULL,
    "nowSum" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "CrowdFunding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_cfId_key" ON "Article"("cfId");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_cfId_fkey" FOREIGN KEY ("cfId") REFERENCES "CrowdFunding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrowdFunding" ADD CONSTRAINT "CrowdFunding_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrowdFunding" ADD CONSTRAINT "CrowdFunding_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
