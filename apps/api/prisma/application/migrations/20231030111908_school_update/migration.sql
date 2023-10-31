-- AlterTable
ALTER TABLE "giga_contributed_data" ADD COLUMN     "validatedBy" TEXT;

-- AlterTable
ALTER TABLE "giga_school" ADD COLUMN     "updatedBy" TEXT;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_validatedBy_fkey" FOREIGN KEY ("validatedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
