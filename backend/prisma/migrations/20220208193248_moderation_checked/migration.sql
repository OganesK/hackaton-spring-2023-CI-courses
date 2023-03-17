-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "moderationChecked" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "moderationChecked" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "moderationChecked" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "moderationChecked" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "moderationChecked" BOOLEAN DEFAULT false;
