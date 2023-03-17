-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_posterId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "posterId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "EventUpdatedVariable" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" INTEGER NOT NULL,
    "posterId" INTEGER,
    "name" VARCHAR(128),
    "category" VARCHAR(128),
    "description" VARCHAR(512),
    "shortDescription" VARCHAR(256),
    "date" TIMESTAMP(3),

    CONSTRAINT "EventUpdatedVariable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventUpdatedVariable_eventId_key" ON "EventUpdatedVariable"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EventUpdatedVariable_posterId_key" ON "EventUpdatedVariable"("posterId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUpdatedVariable" ADD CONSTRAINT "EventUpdatedVariable_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUpdatedVariable" ADD CONSTRAINT "EventUpdatedVariable_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
