/*
  Warnings:

  - You are about to drop the column `class_rooms` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `connection_type` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `connectivity_speed` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `connectivity_speed_status` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `coverage_2G` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `coverage_3G` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `coverage_4G` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `googlemap` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `hasSatteliteBuilding` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `internet_links` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `twiter_handle` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `wikipedia` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `giga_school` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "class_rooms",
DROP COLUMN "connection_type",
DROP COLUMN "connectivity_speed",
DROP COLUMN "connectivity_speed_status",
DROP COLUMN "coverage_2G",
DROP COLUMN "coverage_3G",
DROP COLUMN "coverage_4G",
DROP COLUMN "email",
DROP COLUMN "googlemap",
DROP COLUMN "hasSatteliteBuilding",
DROP COLUMN "internet_links",
DROP COLUMN "phone_number",
DROP COLUMN "twiter_handle",
DROP COLUMN "website",
DROP COLUMN "wikipedia",
DROP COLUMN "youtube";
