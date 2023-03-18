/*
  Warnings:

  - Added the required column `rightAnswer` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
ADD COLUMN     "rightAnswer" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TestPass" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "testId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TestPass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestPass" ADD CONSTRAINT "TestPass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPass" ADD CONSTRAINT "TestPass_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
