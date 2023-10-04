-- AlterTable
ALTER TABLE "giga_school" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "minted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
