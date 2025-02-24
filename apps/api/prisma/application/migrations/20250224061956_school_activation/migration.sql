/*
  Warnings:

  - You are about to drop the `giga_shcool_activation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "giga_shcool_activation";

-- CreateTable
CREATE TABLE "giga_school_activation" (
    "id" TEXT NOT NULL,
    "status" "ActivationStatus" NOT NULL DEFAULT 'INACTIVE',
    "activatedBy" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "giga_school_activation_pkey" PRIMARY KEY ("id")
);
