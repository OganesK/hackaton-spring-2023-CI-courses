-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "isApproved" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "isApproved" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "isApproved" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "isApproved" DROP NOT NULL;
