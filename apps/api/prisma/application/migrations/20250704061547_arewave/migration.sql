/*
  Warnings:

  - Added the required column `country_id` to the `giga_arweave_data` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "giga_arweave_data_date_key";

-- AlterTable
ALTER TABLE "giga_arweave_data" ADD COLUMN     "country_id" TEXT NOT NULL,
ALTER COLUMN "arweaveHash" SET NOT NULL,
ALTER COLUMN "arweaveHash" SET DATA TYPE TEXT;
