-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CONTRIBUTOR');

-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('READ', 'WRITE', 'UPDATE', 'DELETE', 'MANAGE', 'SCHOOL_UPDATE', 'SCHOOL_READ', 'DATA_VALID', 'USER_UPDATE', 'DATA_CONTRIBUTE');

-- CreateEnum
CREATE TYPE "SchoolStatus" AS ENUM ('Open', 'Closed');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Private', 'Public');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Primary', 'Secondary', 'Higher_Secondary', 'Unkown');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Validated', 'Rejected', 'Pending');

-- CreateEnum
CREATE TYPE "ContributionType" AS ENUM ('VOTE', 'CONTRIBUTE');

-- CreateEnum
CREATE TYPE "MintStatus" AS ENUM ('NOTMINTED', 'MINTED', 'ISMINTING');

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_roles" (
    "role_id" TEXT NOT NULL,
    "name" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "giga_permissions" (
    "id" TEXT NOT NULL,
    "action" "Permissions" NOT NULL,
    "subject" TEXT NOT NULL,
    "conditions" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "walletAddress" BYTEA,
    "profileImage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "lastLoggedIn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "roles" "Role"[],
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_school" (
    "id" TEXT NOT NULL,
    "giga_school_id" TEXT NOT NULL,
    "status" "SchoolStatus" NOT NULL DEFAULT 'Open',
    "connectivity_speed_status" TEXT DEFAULT 'Data Unavailable',
    "connectivity" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "school_type" TEXT NOT NULL,
    "class_rooms" INTEGER,
    "electricity_available" BOOLEAN NOT NULL DEFAULT false,
    "website" TEXT,
    "email" TEXT,
    "phone_number" TEXT,
    "country" TEXT NOT NULL,
    "twiter_handle" TEXT,
    "wikipedia" TEXT,
    "googlemap" TEXT,
    "youtube" TEXT,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "minted" "MintStatus" NOT NULL DEFAULT 'NOTMINTED',
    "coverage_availability" BOOLEAN NOT NULL DEFAULT false,
    "coverage_2G" BOOLEAN NOT NULL DEFAULT false,
    "coverage_3G" BOOLEAN NOT NULL DEFAULT false,
    "coverage_4G" BOOLEAN NOT NULL DEFAULT false,
    "hasSatteliteBuilding" BOOLEAN NOT NULL DEFAULT false,
    "connection_type" TEXT,
    "connectivity_speed" INTEGER,
    "internet_links" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "updatedBy" TEXT,
    "uploadId" TEXT,

    CONSTRAINT "giga_school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_contributed_data" (
    "id" TEXT NOT NULL,
    "contributed_data" JSONB NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "school_Id" TEXT NOT NULL,
    "contributedUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "approvedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "validatedBy" TEXT,
    "validatedAt" TIMESTAMP(3),

    CONSTRAINT "giga_contributed_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_csv_uploads" (
    "id" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "fileValue" JSONB NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "giga_csv_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_validated_data" (
    "id" TEXT NOT NULL,
    "school_Id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "approvedStatus" BOOLEAN NOT NULL DEFAULT false,
    "inProgressStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "contributed_data" TEXT[],
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_validated_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_otp" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "giga_otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_otp_key" ON "Auth"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "giga_roles_name_key" ON "giga_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "giga_permissions_action_key" ON "giga_permissions"("action");

-- CreateIndex
CREATE UNIQUE INDEX "giga_users_email_key" ON "giga_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "giga_users_walletAddress_key" ON "giga_users"("walletAddress");

-- CreateIndex
CREATE INDEX "giga_users_name_idx" ON "giga_users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "giga_school_giga_school_id_key" ON "giga_school"("giga_school_id");

-- CreateIndex
CREATE INDEX "giga_school_name_country_idx" ON "giga_school"("name", "country");

-- CreateIndex
CREATE INDEX "giga_contributed_data_school_Id_contributedUserId_idx" ON "giga_contributed_data"("school_Id", "contributedUserId");

-- CreateIndex
CREATE INDEX "giga_validated_data_school_Id_idx" ON "giga_validated_data"("school_Id");

-- CreateIndex
CREATE UNIQUE INDEX "giga_otp_otp_key" ON "giga_otp"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "giga_otp_userId_key" ON "giga_otp"("userId");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_id_fkey" FOREIGN KEY ("id") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_permissions" ADD CONSTRAINT "giga_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "giga_roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "giga_csv_uploads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_school_Id_fkey" FOREIGN KEY ("school_Id") REFERENCES "giga_school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_contributedUserId_fkey" FOREIGN KEY ("contributedUserId") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_validatedBy_fkey" FOREIGN KEY ("validatedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_validated_data" ADD CONSTRAINT "giga_validated_data_school_Id_fkey" FOREIGN KEY ("school_Id") REFERENCES "giga_school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_validated_data" ADD CONSTRAINT "giga_validated_data_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_otp" ADD CONSTRAINT "giga_otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
