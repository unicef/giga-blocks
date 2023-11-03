-- DropIndex
DROP INDEX "giga_validated_data_school_Id_key";

-- AlterTable
ALTER TABLE "giga_contributed_data" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT;

-- AlterTable
ALTER TABLE "giga_validated_data" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "contributed_data" TEXT[];

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_validated_data" ADD CONSTRAINT "giga_validated_data_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
