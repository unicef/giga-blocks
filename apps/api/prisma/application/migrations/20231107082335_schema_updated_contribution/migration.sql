-- DropIndex
DROP INDEX "giga_validated_data_school_Id_key";

-- AlterTable
ALTER TABLE "giga_contributed_data" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "validatedAt" TIMESTAMP(3),
ADD COLUMN     "validatedBy" TEXT;

-- AlterTable
ALTER TABLE "giga_school" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "giga_validated_data" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "approvedStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "contributed_data" TEXT[];

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_validatedBy_fkey" FOREIGN KEY ("validatedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_validated_data" ADD CONSTRAINT "giga_validated_data_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
