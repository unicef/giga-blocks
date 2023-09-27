/*
  Warnings:

  - You are about to drop the column `computer_lab` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `computers` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `country_name` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `daily_check_app` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `education_level` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `email_contact` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `physical_address` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `school_website` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `teachers` on the `giga_school` table. All the data in the column will be lost.
  - Added the required column `country` to the `giga_school` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "computer_lab",
DROP COLUMN "computers",
DROP COLUMN "country_name",
DROP COLUMN "daily_check_app",
DROP COLUMN "education_level",
DROP COLUMN "email_contact",
DROP COLUMN "location",
DROP COLUMN "physical_address",
DROP COLUMN "school_website",
DROP COLUMN "teachers",
ADD COLUMN     "connection_type" TEXT,
ADD COLUMN     "connectivity_speed" INTEGER,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "coverage_2G" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coverage_3G" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coverage_4G" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "googlemap" TEXT,
ADD COLUMN     "hasSatteliteBuilding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "internet_links" INTEGER,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "wikipedia" TEXT;
