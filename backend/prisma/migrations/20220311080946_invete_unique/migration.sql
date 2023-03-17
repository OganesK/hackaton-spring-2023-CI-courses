/*
  Warnings:

  - A unique constraint covering the columns `[inviteURL]` on the table `MessagerGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MessagerGroup_inviteURL_key" ON "MessagerGroup"("inviteURL");
