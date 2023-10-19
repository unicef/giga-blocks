-- CreateTable
CREATE TABLE "csv uploads" (
    "id" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "fileValue" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "csv uploads_pkey" PRIMARY KEY ("id")
);
