/*
  Warnings:

  - You are about to drop the column `season_ID` on the `giga_contributed_data` table. All the data in the column will be lost.
  - Made the column `school_Id` on table `giga_contributed_data` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "giga_contributed_data" DROP CONSTRAINT "giga_contributed_data_season_ID_fkey";

-- AlterTable
ALTER TABLE "giga_contributed_data" DROP COLUMN "season_ID",
ADD COLUMN     "seasonId" TEXT,
ALTER COLUMN "school_Id" SET NOT NULL;

-- CreateTable
CREATE TABLE "giga_validated_data" (
    "id" TEXT NOT NULL,
    "school_Id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_validated_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_validated_data_school_Id_key" ON "giga_validated_data"("school_Id");

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_school_Id_fkey" FOREIGN KEY ("school_Id") REFERENCES "giga_school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "giga_season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_validated_data" ADD CONSTRAINT "giga_validated_data_school_Id_fkey" FOREIGN KEY ("school_Id") REFERENCES "giga_school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
