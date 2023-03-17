-- DropForeignKey
ALTER TABLE "RegisteredForEvent" DROP CONSTRAINT "RegisteredForEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_eventId_fkey";

-- AddForeignKey
ALTER TABLE "RegisteredForEvent" ADD CONSTRAINT "RegisteredForEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
