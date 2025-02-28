/*
  Warnings:

  - You are about to drop the `UserActivation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserActivation" DROP CONSTRAINT "UserActivation_userId_fkey";

-- DropTable
DROP TABLE "UserActivation";

-- CreateTable
CREATE TABLE "giga_user_activation" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "walletAddress" BYTEA,
    "username" TEXT,
    "nftAddress" TEXT,
    "nftReserved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "giga_user_activation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "giga_user_activation" ADD CONSTRAINT "giga_user_activation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
