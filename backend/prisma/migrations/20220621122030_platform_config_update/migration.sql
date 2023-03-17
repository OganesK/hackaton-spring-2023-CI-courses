/*
  Warnings:

  - You are about to drop the `_PlatformConfigToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlatformConfigToPost" DROP CONSTRAINT "_PlatformConfigToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlatformConfigToPost" DROP CONSTRAINT "_PlatformConfigToPost_B_fkey";

-- DropTable
DROP TABLE "_PlatformConfigToPost";

-- CreateTable
CREATE TABLE "_newsOnLanding" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_offersOnLanding" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CrowdFundingToPlatformConfig" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_newsOnLanding_AB_unique" ON "_newsOnLanding"("A", "B");

-- CreateIndex
CREATE INDEX "_newsOnLanding_B_index" ON "_newsOnLanding"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_offersOnLanding_AB_unique" ON "_offersOnLanding"("A", "B");

-- CreateIndex
CREATE INDEX "_offersOnLanding_B_index" ON "_offersOnLanding"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CrowdFundingToPlatformConfig_AB_unique" ON "_CrowdFundingToPlatformConfig"("A", "B");

-- CreateIndex
CREATE INDEX "_CrowdFundingToPlatformConfig_B_index" ON "_CrowdFundingToPlatformConfig"("B");

-- AddForeignKey
ALTER TABLE "_newsOnLanding" ADD FOREIGN KEY ("A") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_newsOnLanding" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_offersOnLanding" ADD FOREIGN KEY ("A") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_offersOnLanding" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrowdFundingToPlatformConfig" ADD FOREIGN KEY ("A") REFERENCES "CrowdFunding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrowdFundingToPlatformConfig" ADD FOREIGN KEY ("B") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
