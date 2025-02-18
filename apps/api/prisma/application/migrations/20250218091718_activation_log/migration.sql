-- CreateEnum
CREATE TYPE "ActivationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "giga_shcool_activation" (
    "id" TEXT NOT NULL,
    "status" "ActivationStatus" NOT NULL DEFAULT 'INACTIVE',
    "activatedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "giga_shcool_activation_pkey" PRIMARY KEY ("id")
);
