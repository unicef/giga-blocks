/*
  Warnings:

  - Added the required column `version_id` to the `giga_school` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "giga_school" ADD COLUMN     "version_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "school_version" (
    "id" TEXT NOT NULL,
    "country_code" VARCHAR(3) NOT NULL,
    "version" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "schoolId" TEXT,

    CONSTRAINT "school_version_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "school_version_country_code_version_key" ON "school_version"("country_code", "version");

-- AddForeignKey
ALTER TABLE "school_version" ADD CONSTRAINT "school_version_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "giga_school"("id") ON DELETE SET NULL ON UPDATE CASCADE;
