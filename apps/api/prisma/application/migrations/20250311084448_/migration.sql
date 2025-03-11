/*
  Warnings:

  - Added the required column `name` to the `giga_link_activation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "giga_link_activation" ADD COLUMN     "name" TEXT NOT NULL;
