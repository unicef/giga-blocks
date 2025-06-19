-- CreateEnum
CREATE TYPE "ImageGenerationStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'FAILED', 'SUCESS');

-- AlterTable
ALTER TABLE "giga_school" ADD COLUMN     "imageGeneration" "ImageGenerationStatus" NOT NULL DEFAULT 'NOT_STARTED';
