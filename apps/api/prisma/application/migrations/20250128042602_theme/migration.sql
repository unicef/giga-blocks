/*
  Warnings:

  - You are about to drop the column `region` on the `giga_school` table. All the data in the column will be lost.
  - Added the required column `version_id` to the `giga_school` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "region",
ADD COLUMN     "giga_maps_data" JSONB,
ADD COLUMN     "themeId" TEXT,
ADD COLUMN     "version_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "school_version" (
    "id" TEXT NOT NULL,
    "country_code" VARCHAR(3) NOT NULL,
    "version" INTEGER NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "schoolId" TEXT,

    CONSTRAINT "school_version_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "school_version_country_code_version_key" ON "school_version"("country_code", "version");

-- CreateIndex
CREATE UNIQUE INDEX "giga_themes_name_key" ON "giga_themes"("name");

-- AddForeignKey
ALTER TABLE "school_version" ADD CONSTRAINT "school_version_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "giga_school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "giga_themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
