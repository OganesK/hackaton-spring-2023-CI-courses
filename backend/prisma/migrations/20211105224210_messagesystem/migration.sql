-- DropForeignKey
ALTER TABLE "Communication" DROP CONSTRAINT "Communication_projectRecipientId_fkey";

-- DropForeignKey
ALTER TABLE "Communication" DROP CONSTRAINT "Communication_projectSenderId_fkey";

-- DropForeignKey
ALTER TABLE "Communication" DROP CONSTRAINT "Communication_userRecipientId_fkey";

-- DropForeignKey
ALTER TABLE "Communication" DROP CONSTRAINT "Communication_userSenderId_fkey";

-- AlterTable
ALTER TABLE "Communication" ALTER COLUMN "projectSenderId" DROP NOT NULL,
ALTER COLUMN "projectRecipientId" DROP NOT NULL,
ALTER COLUMN "userSenderId" DROP NOT NULL,
ALTER COLUMN "userRecipientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_projectSenderId_fkey" FOREIGN KEY ("projectSenderId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_projectRecipientId_fkey" FOREIGN KEY ("projectRecipientId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_userSenderId_fkey" FOREIGN KEY ("userSenderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_userRecipientId_fkey" FOREIGN KEY ("userRecipientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
