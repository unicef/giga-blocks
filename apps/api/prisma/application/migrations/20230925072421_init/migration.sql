/*
  Warnings:

  - The primary key for the `giga_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permission_id` on the `giga_permissions` table. All the data in the column will be lost.
  - The primary key for the `giga_school` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `school_id` on the `giga_school` table. All the data in the column will be lost.
  - You are about to drop the column `school_status` on the `giga_school` table. All the data in the column will be lost.
  - The primary key for the `giga_season` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `season_id` on the `giga_season` table. All the data in the column will be lost.
  - The required column `id` was added to the `giga_permissions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `giga_school` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `giga_season` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "giga_contributed_data" DROP CONSTRAINT "giga_contributed_data_season_ID_fkey";

-- DropForeignKey
ALTER TABLE "giga_points" DROP CONSTRAINT "giga_points_season_id_fkey";

-- DropForeignKey
ALTER TABLE "giga_school" DROP CONSTRAINT "giga_school_season_Id_fkey";

-- AlterTable
ALTER TABLE "giga_permissions" DROP CONSTRAINT "giga_permissions_pkey",
DROP COLUMN "permission_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "giga_permissions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "giga_school" DROP CONSTRAINT "giga_school_pkey",
DROP COLUMN "school_id",
DROP COLUMN "school_status",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "status" "SchoolStatus" NOT NULL DEFAULT 'Open',
ADD CONSTRAINT "giga_school_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "giga_season" DROP CONSTRAINT "giga_season_pkey",
DROP COLUMN "season_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "giga_season_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_season_Id_fkey" FOREIGN KEY ("season_Id") REFERENCES "giga_season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_season_ID_fkey" FOREIGN KEY ("season_ID") REFERENCES "giga_season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_points" ADD CONSTRAINT "giga_points_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "giga_season"("id") ON DELETE SET NULL ON UPDATE CASCADE;
