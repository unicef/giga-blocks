/*
  Warnings:

  - You are about to drop the column `region` on the `giga_school` table. All the data in the column will be lost.
  - Made the column `version_id` on table `giga_school` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "region",
ADD COLUMN     "giga_maps_data" JSONB,
ALTER COLUMN "version_id" SET NOT NULL;
