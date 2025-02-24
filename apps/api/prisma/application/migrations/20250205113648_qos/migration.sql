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
