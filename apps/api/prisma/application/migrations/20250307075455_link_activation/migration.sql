/*
  Warnings:

  - You are about to drop the column `region` on the `giga_school` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ActivationStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');

-- DropIndex
DROP INDEX "giga_school_name_country_idx";

-- DropIndex
DROP INDEX "giga_users_name_idx";

-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "region",
ADD COLUMN     "themeId" TEXT;

-- CreateTable
CREATE TABLE "giga_magic_link_otp" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "giga_magic_link_otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_themes" (
    "id" TEXT NOT NULL,
    "colorScheme" JSONB NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_qos" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "country_id" TEXT NOT NULL,
    "giga_school_id" TEXT NOT NULL,
    "speed_download_probe" TEXT NOT NULL,
    "speed_upload_probe" TEXT NOT NULL,
    "latency_probe" TEXT NOT NULL,
    "ce_ingress" TEXT NOT NULL,
    "ce_egress" TEXT NOT NULL,
    "pe_ingress" TEXT NOT NULL,
    "pe_egress" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "speed_download" TEXT NOT NULL,
    "speed_upload" TEXT NOT NULL,
    "latency" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "gigasync_id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "dynamicData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "giga_qos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_arweave_data" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "arweaveHash" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "giga_arweave_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_link_activation" (
    "id" TEXT NOT NULL,
    "status" "ActivationStatus" NOT NULL DEFAULT 'INACTIVE',
    "activatedBy" TEXT NOT NULL,
    "deActivatedBy" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "giga_link_activation_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "giga_magic_link_otp_otp_key" ON "giga_magic_link_otp"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "giga_magic_link_otp_email_key" ON "giga_magic_link_otp"("email");

-- CreateIndex
CREATE UNIQUE INDEX "giga_themes_name_key" ON "giga_themes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "giga_arweave_data_date_key" ON "giga_arweave_data"("date");

-- CreateIndex
CREATE UNIQUE INDEX "giga_contributor_email_key" ON "giga_contributor"("email");

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "giga_themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_link_activation" ADD CONSTRAINT "giga_link_activation_activatedBy_fkey" FOREIGN KEY ("activatedBy") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_link_activation" ADD CONSTRAINT "giga_link_activation_deActivatedBy_fkey" FOREIGN KEY ("deActivatedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "giga_school_minted_status_electricity_available_idx" RENAME TO "giga_school_minted_idx";
