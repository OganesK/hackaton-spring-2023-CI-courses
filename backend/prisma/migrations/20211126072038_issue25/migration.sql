/*
  Warnings:

  - You are about to drop the `Moderate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_moderateId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_moderateId_fkey";

-- DropForeignKey
ALTER TABLE "Moderate" DROP CONSTRAINT "Moderate_auditorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_moderateId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_moderateId_fkey";

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_moderateId_fkey";

-- DropTable
DROP TABLE "Moderate";

-- CreateTable
CREATE TABLE "Moderation" (
    "id" SERIAL NOT NULL,
    "moderatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auditorId" INTEGER,

    CONSTRAINT "Moderation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_moderateId_fkey" FOREIGN KEY ("moderateId") REFERENCES "Moderation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moderation" ADD CONSTRAINT "Moderation_auditorId_fkey" FOREIGN KEY ("auditorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
