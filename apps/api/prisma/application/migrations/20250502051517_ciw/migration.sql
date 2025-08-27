-- CreateTable
CREATE TABLE "giga_ciw" (
    "id" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "name" TEXT,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "giga_ciw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_ciw_did_key" ON "giga_ciw"("did");

-- CreateIndex
CREATE UNIQUE INDEX "giga_ciw_email_key" ON "giga_ciw"("email");
