/*
  Warnings:

  - You are about to drop the column `country` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `country_id` on the `giga_school` table. All the data in the column will be lost.
  - Added the required column `country_name` to the `giga_school` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "country",
DROP COLUMN "country_id",
ADD COLUMN     "country_name" TEXT NOT NULL;
