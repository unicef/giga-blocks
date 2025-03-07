-- AlterTable
ALTER TABLE "giga_school_activation" ADD COLUMN     "deActivatedBy" TEXT;

-- AddForeignKey
ALTER TABLE "giga_school_activation" ADD CONSTRAINT "giga_school_activation_activatedBy_fkey" FOREIGN KEY ("activatedBy") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_school_activation" ADD CONSTRAINT "giga_school_activation_deActivatedBy_fkey" FOREIGN KEY ("deActivatedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
