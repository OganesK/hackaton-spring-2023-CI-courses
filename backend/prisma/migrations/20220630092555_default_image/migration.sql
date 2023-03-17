-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "avatarId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "CrowdFunding" ALTER COLUMN "posterId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "posterId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "posterId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "posterId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarId" SET DEFAULT 1;
