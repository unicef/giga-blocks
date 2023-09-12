/*
  Warnings:

  - Made the column `email` on table `giga_users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "giga_users" ALTER COLUMN "email" SET NOT NULL;
