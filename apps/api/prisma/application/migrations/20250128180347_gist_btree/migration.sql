/*
  Warnings:

  - You are about to drop the column `region` on the `giga_school` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "giga_school_name_country_idx";

-- DropIndex
DROP INDEX "giga_users_name_idx";

-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "region",
ADD COLUMN     "themeId" TEXT;

-- CreateTable
CREATE TABLE "giga_themes" (
    "id" TEXT NOT NULL,
    "colorScheme" JSONB NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_themes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_themes_name_key" ON "giga_themes"("name");

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "giga_themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "giga_school_minted_status_electricity_available_idx" RENAME TO "giga_school_minted_idx";
