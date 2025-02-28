/*
  Warnings:

  - You are about to drop the column `userId` on the `giga_user_activation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "giga_user_activation" DROP CONSTRAINT "giga_user_activation_userId_fkey";

-- AlterTable
ALTER TABLE "giga_user_activation" DROP COLUMN "userId";
