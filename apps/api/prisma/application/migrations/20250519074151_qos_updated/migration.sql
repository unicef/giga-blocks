/*
  Warnings:

  - You are about to drop the column `ce_egress` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `ce_ingress` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `latency_probe` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `pe_egress` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `pe_ingress` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `speed_download_probe` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `speed_upload_probe` on the `giga_qos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "giga_qos" DROP COLUMN "ce_egress",
DROP COLUMN "ce_ingress",
DROP COLUMN "latency_probe",
DROP COLUMN "pe_egress",
DROP COLUMN "pe_ingress",
DROP COLUMN "speed_download_probe",
DROP COLUMN "speed_upload_probe",
ADD COLUMN     "inbound_traffic" TEXT,
ADD COLUMN     "inbound_traffic_sum" TEXT,
ADD COLUMN     "outbound_traffic" TEXT,
ADD COLUMN     "outbound_traffic_sum" TEXT,
ADD COLUMN     "speed_download_max" TEXT,
ADD COLUMN     "speed_download_mean" TEXT,
ADD COLUMN     "speed_upload_max" TEXT,
ADD COLUMN     "speed_upload_mean" TEXT,
ALTER COLUMN "provider" DROP NOT NULL;
