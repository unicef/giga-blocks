-- CreateTable
CREATE TABLE "giga_newsletter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "giga_newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giga_newsletter_email_key" ON "giga_newsletter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "giga_newsletter_id_email_key" ON "giga_newsletter"("id", "email");
