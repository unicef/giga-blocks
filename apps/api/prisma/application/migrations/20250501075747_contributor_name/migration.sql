-- CreateEnum
CREATE TYPE "ContributorNameType" AS ENUM ('REGULAR', 'ENS', 'WALLET', 'NONE');

-- AlterTable
ALTER TABLE "giga_contributor" ADD COLUMN     "name" TEXT,
ADD COLUMN     "nameType" "ContributorNameType" NOT NULL DEFAULT 'NONE';
