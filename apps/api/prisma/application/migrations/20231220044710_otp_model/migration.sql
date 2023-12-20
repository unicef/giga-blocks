-- CreateTable
CREATE TABLE "OTP" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_otp_key" ON "OTP"("otp");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
