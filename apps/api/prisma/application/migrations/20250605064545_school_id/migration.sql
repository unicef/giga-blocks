/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `giga_school` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "giga_school_id_key" ON "giga_school"("id");
