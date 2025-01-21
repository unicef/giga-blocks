/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `school_version` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "school_version" DROP COLUMN "lastUpdated",
ADD COLUMN     "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
