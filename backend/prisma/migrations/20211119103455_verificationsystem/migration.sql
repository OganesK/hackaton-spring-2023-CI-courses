-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "theme" VARCHAR(64) NOT NULL,
    "body" TEXT NOT NULL,
    "toWhomId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_toWhomId_fkey" FOREIGN KEY ("toWhomId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
