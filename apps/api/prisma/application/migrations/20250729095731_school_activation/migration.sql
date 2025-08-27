/*
  Warnings:

  - A unique constraint covering the columns `[schoolId]` on the table `giga_school_activation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "giga_school_activation_schoolId_key" ON "giga_school_activation"("schoolId");
