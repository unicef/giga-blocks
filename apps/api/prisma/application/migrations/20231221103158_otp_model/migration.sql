/*
  Warnings:

  - The values [SEASON_WRITE,SEASON_READ,SEASON_UPDATE,SEASON_DELETE,VALIDATOR_ADD,VALIDATOR_UPDATE,VALIDATOR_DELETE,DATA_VOTE] on the enum `Permissions` will be removed. If these variants are still used in the database, this will fail.
  - The values [USER,VALIDATOR,PENDING] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `seasonId` on the `giga_contributed_data` table. All the data in the column will be lost.
  - You are about to drop the column `season_Id` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the `giga_points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `giga_season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `giga_vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Permissions_new" AS ENUM ('READ', 'WRITE', 'UPDATE', 'DELETE', 'MANAGE', 'SCHOOL_UPDATE', 'SCHOOL_READ', 'DATA_VALID', 'USER_UPDATE', 'DATA_CONTRIBUTE');
ALTER TABLE "giga_permissions" ALTER COLUMN "action" TYPE "Permissions_new" USING ("action"::text::"Permissions_new");
ALTER TYPE "Permissions" RENAME TO "Permissions_old";
ALTER TYPE "Permissions_new" RENAME TO "Permissions";
DROP TYPE "Permissions_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'CONTRIBUTOR');
ALTER TABLE "giga_roles" ALTER COLUMN "name" TYPE "Role_new" USING ("name"::text::"Role_new");
ALTER TABLE "giga_users" ALTER COLUMN "roles" TYPE "Role_new"[] USING ("roles"::text::"Role_new"[]);
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "giga_contributed_data" DROP CONSTRAINT "giga_contributed_data_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "giga_points" DROP CONSTRAINT "giga_points_contributedDataId_fkey";

-- DropForeignKey
ALTER TABLE "giga_points" DROP CONSTRAINT "giga_points_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "giga_points" DROP CONSTRAINT "giga_points_season_id_fkey";

-- DropForeignKey
ALTER TABLE "giga_points" DROP CONSTRAINT "giga_points_user_id_fkey";

-- DropForeignKey
ALTER TABLE "giga_school" DROP CONSTRAINT "giga_school_season_Id_fkey";

-- DropForeignKey
ALTER TABLE "giga_vote" DROP CONSTRAINT "giga_vote_contributed_Id_fkey";

-- DropForeignKey
ALTER TABLE "giga_vote" DROP CONSTRAINT "giga_vote_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "giga_vote" DROP CONSTRAINT "giga_vote_user_id_fkey";

-- AlterTable
ALTER TABLE "giga_contributed_data" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "giga_school" DROP COLUMN "season_Id";

-- DropTable
DROP TABLE "giga_points";

-- DropTable
DROP TABLE "giga_season";

-- DropTable
DROP TABLE "giga_vote";

-- DropEnum
DROP TYPE "LeaderBoardType";

-- DropEnum
DROP TYPE "Season_Status";

-- DropEnum
DROP TYPE "VOTE_TYPE";

-- CreateTable
CREATE TABLE "giga_otp" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "giga_otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_otp_otp_key" ON "giga_otp"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "giga_otp_userId_key" ON "giga_otp"("userId");

-- AddForeignKey
ALTER TABLE "giga_otp" ADD CONSTRAINT "giga_otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
