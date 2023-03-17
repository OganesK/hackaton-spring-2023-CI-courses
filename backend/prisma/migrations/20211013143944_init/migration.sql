-- CreateEnum
CREATE TYPE "Role" AS ENUM ('resident', 'investor', 'moderator', 'administrator');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role",
    "firstname" VARCHAR(64) NOT NULL,
    "lastname" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "login" VARCHAR(64) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "position" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,
    "videoPresentation" VARCHAR(255),
    "images" TEXT[],
    "description" VARCHAR(255) NOT NULL,
    "shortDescription" VARCHAR(64) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "metricsId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMetrics" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "workersCount" INTEGER NOT NULL,
    "earned" INTEGER NOT NULL,
    "investmentsGot" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "avatar" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "shortDescription" VARCHAR(64) NOT NULL,
    "activityKind" VARCHAR(32) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,
    "body" VARCHAR(64) NOT NULL,
    "ownerCompanyId" INTEGER NOT NULL,
    "consumerCompanies" TEXT[],
    "shortDescription" VARCHAR(64) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "adress" VARCHAR(64) NOT NULL,
    "phone" VARCHAR(64) NOT NULL,
    "companyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "atachments" TEXT[],
    "projectId" INTEGER NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "auditedAt" TIMESTAMP(3),
    "auditerId" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "rejectMessage" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "poster" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "shortInfo" VARCHAR(64) NOT NULL,
    "caption" VARCHAR(64) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "category" VARCHAR(64) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "shortDescription" VARCHAR(64) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "poster" VARCHAR(255) NOT NULL,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformConfig" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalInvestments" INTEGER NOT NULL,
    "totalProjectsCount" INTEGER NOT NULL,
    "totalPartnersCount" INTEGER NOT NULL,
    "platformTagline" TEXT NOT NULL,
    "platformTitle" TEXT NOT NULL,
    "platformShortDescription" TEXT NOT NULL,
    "platformDescription" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "category" VARCHAR(64) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "body" VARCHAR(511) NOT NULL,
    "projectId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectMetricsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PlatformConfigToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NewsToPlatformConfig" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToPlatformConfig" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.login_unique" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMetrics_projectId_unique" ON "ProjectMetrics"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToUser_AB_unique" ON "_ProjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToUser_B_index" ON "_ProjectToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectMetricsToUser_AB_unique" ON "_ProjectMetricsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectMetricsToUser_B_index" ON "_ProjectMetricsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlatformConfigToProject_AB_unique" ON "_PlatformConfigToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_PlatformConfigToProject_B_index" ON "_PlatformConfigToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToPlatformConfig_AB_unique" ON "_NewsToPlatformConfig"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsToPlatformConfig_B_index" ON "_NewsToPlatformConfig"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToPlatformConfig_AB_unique" ON "_EventToPlatformConfig"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToPlatformConfig_B_index" ON "_EventToPlatformConfig"("B");

-- AddForeignKey
ALTER TABLE "Contact" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToPlatformConfig" ADD FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToPlatformConfig" ADD FOREIGN KEY ("B") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMetrics" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("authorId") REFERENCES "Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("auditerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMetricsToUser" ADD FOREIGN KEY ("A") REFERENCES "ProjectMetrics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMetricsToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPlatformConfig" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPlatformConfig" ADD FOREIGN KEY ("B") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD FOREIGN KEY ("ownerCompanyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformConfigToProject" ADD FOREIGN KEY ("A") REFERENCES "PlatformConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlatformConfigToProject" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
