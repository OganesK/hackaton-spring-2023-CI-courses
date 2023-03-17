/*
  Warnings:

  - A unique constraint covering the columns `[avatarId]` on the table `CompanyUpdatedVariable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[posterId]` on the table `PostUpdatedVariable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[posterId]` on the table `ProjectUpdatedVariable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[posterId]` on the table `SolutionUpdatedVariable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `posterId` to the `SolutionUpdatedVariable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyUpdatedVariable" ADD COLUMN     "avatarId" INTEGER;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "projectMediaUpdatedId" INTEGER;

-- AlterTable
ALTER TABLE "PostUpdatedVariable" ADD COLUMN     "posterId" INTEGER;

-- AlterTable
ALTER TABLE "ProjectUpdatedVariable" ADD COLUMN     "posterId" INTEGER;

-- AlterTable
ALTER TABLE "SolutionUpdatedVariable" ADD COLUMN     "posterId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserUpdatedVariable" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "avatarId" INTEGER,

    CONSTRAINT "UserUpdatedVariable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserUpdatedVariable_userId_key" ON "UserUpdatedVariable"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserUpdatedVariable_avatarId_key" ON "UserUpdatedVariable"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUpdatedVariable_avatarId_key" ON "CompanyUpdatedVariable"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "PostUpdatedVariable_posterId_key" ON "PostUpdatedVariable"("posterId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUpdatedVariable_posterId_key" ON "ProjectUpdatedVariable"("posterId");

-- CreateIndex
CREATE UNIQUE INDEX "SolutionUpdatedVariable_posterId_key" ON "SolutionUpdatedVariable"("posterId");

-- AddForeignKey
ALTER TABLE "UserUpdatedVariable" ADD CONSTRAINT "UserUpdatedVariable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUpdatedVariable" ADD CONSTRAINT "UserUpdatedVariable_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUpdatedVariable" ADD CONSTRAINT "CompanyUpdatedVariable_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUpdatedVariable" ADD CONSTRAINT "ProjectUpdatedVariable_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUpdatedVariable" ADD CONSTRAINT "PostUpdatedVariable_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolutionUpdatedVariable" ADD CONSTRAINT "SolutionUpdatedVariable_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectMediaUpdatedId_fkey" FOREIGN KEY ("projectMediaUpdatedId") REFERENCES "ProjectUpdatedVariable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
