-- CreateTable
CREATE TABLE "giga_featured" (
    "id" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "giga_featured_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_featured_country_code_key" ON "giga_featured"("country_code");

-- AddForeignKey
ALTER TABLE "giga_featured" ADD CONSTRAINT "giga_featured_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
