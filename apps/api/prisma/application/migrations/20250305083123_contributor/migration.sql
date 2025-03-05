/*
  Warnings:

  - You are about to drop the `giga_user_activation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "giga_user_activation";

-- CreateTable
CREATE TABLE "giga_contributor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "walletAddress" BYTEA,
    "username" TEXT,
    "nftAddress" TEXT,
    "totalNftMinted" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "nftReserved" BOOLEAN NOT NULL DEFAULT false,
    "nftClaimed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "giga_contributor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_contributor_email_key" ON "giga_contributor"("email");
