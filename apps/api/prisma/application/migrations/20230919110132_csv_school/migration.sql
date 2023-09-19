/*
  Warnings:

  - Added the required column `coverageAbility` to the `giga_school` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "giga_school" ADD COLUMN     "coverageAbility" INTEGER NOT NULL;
