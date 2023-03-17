-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "newVersionId" INTEGER,
ADD COLUMN     "oldVersionId" INTEGER;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "oldVersionId" INTEGER;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "oldVersionId" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "oldVersionId" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "oldVersionId" INTEGER;

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "oldVersionId" INTEGER;
