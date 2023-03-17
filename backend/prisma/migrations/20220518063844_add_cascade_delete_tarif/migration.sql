-- DropForeignKey
ALTER TABLE "CrowdFundingTariff" DROP CONSTRAINT "CrowdFundingTariff_crowdFundingId_fkey";

-- AddForeignKey
ALTER TABLE "CrowdFundingTariff" ADD CONSTRAINT "CrowdFundingTariff_crowdFundingId_fkey" FOREIGN KEY ("crowdFundingId") REFERENCES "CrowdFunding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
