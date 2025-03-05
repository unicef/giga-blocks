-- CreateTable
CREATE TABLE "giga_magic_link_otp" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "giga_magic_link_otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_magic_link_otp_otp_key" ON "giga_magic_link_otp"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "giga_magic_link_otp_email_key" ON "giga_magic_link_otp"("email");
