/*
  Warnings:

  - Made the column `email` on table `giga_user_activation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "giga_user_activation" ALTER COLUMN "email" SET NOT NULL;
