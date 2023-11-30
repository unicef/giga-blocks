/*
  Warnings:

  - The `coverage_availability` column on the `giga_school` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "coverage_availability",
ADD COLUMN     "coverage_availability" BOOLEAN NOT NULL DEFAULT false;
