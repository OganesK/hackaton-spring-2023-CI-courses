-- CreateTable
CREATE TABLE "payedTariffs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cfId" INTEGER NOT NULL,
    "summ" DOUBLE PRECISION NOT NULL,
    "email" VARCHAR(512) NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,

    CONSTRAINT "payedTariffs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payedTariffs" ADD CONSTRAINT "payedTariffs_cfId_fkey" FOREIGN KEY ("cfId") REFERENCES "CrowdFunding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
