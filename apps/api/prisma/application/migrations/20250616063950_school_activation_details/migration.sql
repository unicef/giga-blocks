-- CreateTable
CREATE TABLE "giga_school_activation" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "contributorData" JSONB NOT NULL,
    "schoolUpdated" BOOLEAN NOT NULL DEFAULT false,
    "transactionStatus" INTEGER,

    CONSTRAINT "giga_school_activation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_school_activation_transactionHash_key" ON "giga_school_activation"("transactionHash");
