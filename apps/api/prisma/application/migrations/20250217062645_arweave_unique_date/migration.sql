/*
  Warnings:

  - The `arweaveHash` column on the `giga_arweave_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[date]` on the table `giga_arweave_data` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "giga_arweave_data_arweaveHash_key";

-- AlterTable
ALTER TABLE "giga_arweave_data" ALTER COLUMN "date" DROP DEFAULT,
DROP COLUMN "arweaveHash",
ADD COLUMN     "arweaveHash" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "giga_arweave_data_date_key" ON "giga_arweave_data"("date");
