-- CreateTable
CREATE TABLE "UserActivation" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "walletAddress" BYTEA,
    "username" TEXT,
    "nftReserved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "UserActivation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserActivation" ADD CONSTRAINT "UserActivation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
