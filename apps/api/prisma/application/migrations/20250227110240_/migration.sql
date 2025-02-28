/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `giga_user_activation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "giga_user_activation_email_key" ON "giga_user_activation"("email");
