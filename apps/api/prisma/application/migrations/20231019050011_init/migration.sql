/*
  Warnings:

  - Added the required column `fileName` to the `giga_csv_uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "giga_csv_uploads" ADD COLUMN     "fileName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "giga_csv_uploads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
