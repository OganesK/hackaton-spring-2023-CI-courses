-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "avatar" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "poster" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "poster" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "poster" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "poster" DROP NOT NULL;
