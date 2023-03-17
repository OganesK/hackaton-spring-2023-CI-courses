-- CreateTable
CREATE TABLE "Stream" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER,
    "stream_key" TEXT NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stream_stream_key_key" ON "Stream"("stream_key");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_eventId_key" ON "Stream"("eventId");

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
