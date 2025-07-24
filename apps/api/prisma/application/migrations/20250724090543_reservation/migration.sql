/*
  Warnings:

  - You are about to drop the column `schoolreserved` on the `giga_contributor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "giga_contributor" DROP COLUMN "schoolreserved";

-- CreateTable
CREATE TABLE "giga_contributor_reservation" (
    "id" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "reservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "giga_contributor_reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_contributor_reservation_schoolId_key" ON "giga_contributor_reservation"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "giga_contributor_reservation_contributorId_schoolId_key" ON "giga_contributor_reservation"("contributorId", "schoolId");

-- AddForeignKey
ALTER TABLE "giga_contributor_reservation" ADD CONSTRAINT "giga_contributor_reservation_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "giga_contributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributor_reservation" ADD CONSTRAINT "giga_contributor_reservation_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "giga_school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
