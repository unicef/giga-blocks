/*
  Warnings:

  - You are about to drop the column `email` on the `giga_contributor` table. All the data in the column will be lost.
  - You are about to drop the column `nftAddress` on the `giga_contributor` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `giga_contributor` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `giga_contributor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `giga_contributor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `giga_contributor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "giga_contributor_email_key";

-- AlterTable
ALTER TABLE "giga_contributor" DROP COLUMN "email",
DROP COLUMN "nftAddress",
DROP COLUMN "username",
DROP COLUMN "walletAddress",
ADD COLUMN     "schoolreserved" TEXT[],
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "giga_contributor_userId_key" ON "giga_contributor"("userId");

-- AddForeignKey
ALTER TABLE "giga_contributor" ADD CONSTRAINT "giga_contributor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
