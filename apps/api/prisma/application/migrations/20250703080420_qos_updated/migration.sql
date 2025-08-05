/*
  Warnings:

  - You are about to drop the column `gigasync_id` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `inbound_traffic` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `inbound_traffic_sum` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `outbound_traffic` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `outbound_traffic_sum` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `signature` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `speed_download` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `speed_download_max` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `speed_download_mean` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `speed_upload` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `speed_upload_max` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `speed_upload_mean` on the `giga_qos` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `giga_qos` table. All the data in the column will be lost.
  - Added the required column `country_iso3_code` to the `giga_qos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `download_speed` to the `giga_qos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upload_speed` to the `giga_qos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "giga_arweave_data" ADD COLUMN     "onChainUpdated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "giga_qos" DROP COLUMN "gigasync_id",
DROP COLUMN "inbound_traffic",
DROP COLUMN "inbound_traffic_sum",
DROP COLUMN "outbound_traffic",
DROP COLUMN "outbound_traffic_sum",
DROP COLUMN "provider",
DROP COLUMN "signature",
DROP COLUMN "speed_download",
DROP COLUMN "speed_download_max",
DROP COLUMN "speed_download_mean",
DROP COLUMN "speed_upload",
DROP COLUMN "speed_upload_max",
DROP COLUMN "speed_upload_mean",
DROP COLUMN "timestamp",
ADD COLUMN     "arewaveUploaded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "country_iso3_code" TEXT NOT NULL,
ADD COLUMN     "data_source" TEXT,
ADD COLUMN     "download_speed" TEXT NOT NULL,
ADD COLUMN     "upload_speed" TEXT NOT NULL,
ALTER COLUMN "latency" DROP NOT NULL;
