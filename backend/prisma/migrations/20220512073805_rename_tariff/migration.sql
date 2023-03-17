/*
  Warnings:

  - You are about to drop the `CrowdFundingTarif` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CrowdFundingTarif" DROP CONSTRAINT "CrowdFundingTarif_crowdFundingId_fkey";

-- DropTable
DROP TABLE "CrowdFundingTarif";

-- CreateTable
CREATE TABLE "CrowdFundingTariff" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(512) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "buyerCount" INTEGER NOT NULL DEFAULT 0,
    "crowdFundingId" INTEGER NOT NULL,

    CONSTRAINT "CrowdFundingTariff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CrowdFundingTariff" ADD CONSTRAINT "CrowdFundingTariff_crowdFundingId_fkey" FOREIGN KEY ("crowdFundingId") REFERENCES "CrowdFunding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
