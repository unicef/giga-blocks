/*
  Warnings:

  - You are about to drop the `csv uploads` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "csv uploads";

-- CreateTable
CREATE TABLE "giga_csv_uploads" (
    "id" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "fileValue" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "giga_csv_uploads_pkey" PRIMARY KEY ("id")
);
