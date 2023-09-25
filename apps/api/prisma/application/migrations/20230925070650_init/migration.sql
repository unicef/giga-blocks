/*
  Warnings:

  - You are about to drop the column `giga_id_school` on the `giga_school` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "giga_school_giga_id_school_key";

-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "giga_id_school";
