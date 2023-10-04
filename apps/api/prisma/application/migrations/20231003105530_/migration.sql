/*
  Warnings:

  - The `minted` column on the `giga_school` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MintStatus" AS ENUM ('NOTMINTED', 'MINTED', 'ISMINTING');

-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "minted",
ADD COLUMN     "minted" "MintStatus" NOT NULL DEFAULT 'NOTMINTED';
