-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organizerID_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerID_fkey" FOREIGN KEY ("organizerID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
