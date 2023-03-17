-- CreateTable
CREATE TABLE "CrowdFundingTarif" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(512) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "buyerCount" INTEGER NOT NULL DEFAULT 0,
    "crowdFundingId" INTEGER NOT NULL,

    CONSTRAINT "CrowdFundingTarif_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CrowdFundingTarif" ADD CONSTRAINT "CrowdFundingTarif_crowdFundingId_fkey" FOREIGN KEY ("crowdFundingId") REFERENCES "CrowdFunding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
