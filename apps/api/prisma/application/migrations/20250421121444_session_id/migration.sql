-- AlterTable
ALTER TABLE "giga_school" ADD COLUMN     "verifiedCIW" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "giga_id_session_id" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestDetails" JSONB NOT NULL,

    CONSTRAINT "giga_id_session_id_pkey" PRIMARY KEY ("id")
);
