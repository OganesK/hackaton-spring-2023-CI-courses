-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "activityKind" SET DEFAULT E'business';

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "category" SET DEFAULT E'business';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "category" SET DEFAULT E'business';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "category" SET DEFAULT E'business';
