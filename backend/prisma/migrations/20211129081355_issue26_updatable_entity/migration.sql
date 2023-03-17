/*
  Warnings:

  - You are about to drop the column `newVersionId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `oldVersionId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `oldVersionId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `oldVersionId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `oldVersionId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `oldVersionId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `oldVersionId` on the `Solution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "newVersionId",
DROP COLUMN "oldVersionId";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "oldVersionId";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "oldVersionId";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "oldVersionId";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "oldVersionId";

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "oldVersionId";

-- CreateTable
CREATE TABLE "CompanyUpdatedVariable" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "name" VARCHAR(128),
    "description" VARCHAR(256),
    "shortDescription" VARCHAR(128),
    "activityKind" VARCHAR(128),

    CONSTRAINT "CompanyUpdatedVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectUpdatedVariable" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" VARCHAR(128),
    "category" VARCHAR(128),
    "description" TEXT,
    "shortDescription" VARCHAR(128),

    CONSTRAINT "ProjectUpdatedVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactUpdatedVariable" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER NOT NULL,
    "emails" VARCHAR(64)[],
    "adresses" VARCHAR(256)[],
    "phones" VARCHAR(64)[],

    CONSTRAINT "ContactUpdatedVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostUpdatedVariable" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "title" VARCHAR(128),
    "tags" VARCHAR(64)[],
    "articleBody" TEXT,
    "description" VARCHAR(128),

    CONSTRAINT "PostUpdatedVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolutionUpdatedVariable" (
    "id" SERIAL NOT NULL,
    "solutionId" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "body" TEXT NOT NULL,
    "shortDescription" VARCHAR(64) NOT NULL,
    "consumerCompanies" TEXT[],

    CONSTRAINT "SolutionUpdatedVariable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUpdatedVariable_companyId_key" ON "CompanyUpdatedVariable"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUpdatedVariable_projectId_key" ON "ProjectUpdatedVariable"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactUpdatedVariable_contactId_key" ON "ContactUpdatedVariable"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "PostUpdatedVariable_postId_key" ON "PostUpdatedVariable"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "SolutionUpdatedVariable_solutionId_key" ON "SolutionUpdatedVariable"("solutionId");

-- AddForeignKey
ALTER TABLE "CompanyUpdatedVariable" ADD CONSTRAINT "CompanyUpdatedVariable_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUpdatedVariable" ADD CONSTRAINT "ProjectUpdatedVariable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactUpdatedVariable" ADD CONSTRAINT "ContactUpdatedVariable_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUpdatedVariable" ADD CONSTRAINT "PostUpdatedVariable_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolutionUpdatedVariable" ADD CONSTRAINT "SolutionUpdatedVariable_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
