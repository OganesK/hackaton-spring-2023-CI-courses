-- CreateEnum
CREATE TYPE "eventRegisteredVerdict" AS ENUM ('yes', 'maybe');

-- CreateTable
CREATE TABLE "RegisteredForEvent" (
    "id" SERIAL NOT NULL,
    "verdict" "eventRegisteredVerdict" NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "surname" VARCHAR(512) NOT NULL,
    "email" VARCHAR(512) NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "RegisteredForEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RegisteredForEvent" ADD CONSTRAINT "RegisteredForEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
