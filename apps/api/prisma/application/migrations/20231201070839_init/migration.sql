-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'VALIDATOR', 'CONTRIBUTOR', 'PENDING');

-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('READ', 'WRITE', 'UPDATE', 'DELETE', 'MANAGE', 'SEASON_WRITE', 'SEASON_READ', 'SEASON_UPDATE', 'SEASON_DELETE', 'SCHOOL_UPDATE', 'SCHOOL_READ', 'VALIDATOR_ADD', 'VALIDATOR_UPDATE', 'VALIDATOR_DELETE', 'DATA_VALID', 'USER_UPDATE', 'DATA_CONTRIBUTE', 'DATA_VOTE');

-- CreateEnum
CREATE TYPE "VOTE_TYPE" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateEnum
CREATE TYPE "SchoolStatus" AS ENUM ('Open', 'Closed');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Private', 'Public');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Primary', 'Secondary', 'Higher_Secondary', 'Unkown');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Validated', 'Rejected', 'Pending');

-- CreateEnum
CREATE TYPE "LeaderBoardType" AS ENUM ('SEASONAL', 'GLOBAL', 'GENERAL');

-- CreateEnum
CREATE TYPE "Season_Status" AS ENUM ('Start', 'Completed', 'Suspended');

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
    "email" TEXT NOT NULL,
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
    "season_Id" TEXT,
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
    "seasonId" TEXT,

    CONSTRAINT "giga_contributed_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_season" (
    "id" TEXT NOT NULL,
    "season_name" TEXT NOT NULL,
    "season_start_date" TIMESTAMP(3),
    "season_end_date" TIMESTAMP(3),
    "season_status" "Season_Status" NOT NULL DEFAULT 'Start',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_season_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "giga_points" (
    "id" SERIAL NOT NULL,
    "points" INTEGER NOT NULL,
    "leaderBoardType" "LeaderBoardType" NOT NULL,
    "contributionType" "ContributionType" NOT NULL,
    "isConfirmed" BOOLEAN,
    "isValid" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "season_id" TEXT,
    "createdBy" TEXT,
    "user_id" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "contributedDataId" TEXT,

    CONSTRAINT "giga_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giga_vote" (
    "vote_id" TEXT NOT NULL,
    "vote_type" "VOTE_TYPE" NOT NULL,
    "user_id" TEXT NOT NULL,
    "contributed_Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "giga_vote_pkey" PRIMARY KEY ("vote_id")
);

-- CreateTable
CREATE TABLE "giga_validated_data" (
    "id" TEXT NOT NULL,
    "school_Id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "approvedStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "contributed_data" TEXT[],
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "giga_validated_data_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "giga_school_giga_school_id_key" ON "giga_school"("giga_school_id");

-- CreateIndex
CREATE UNIQUE INDEX "giga_vote_user_id_contributed_Id_key" ON "giga_vote"("user_id", "contributed_Id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_id_fkey" FOREIGN KEY ("id") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_permissions" ADD CONSTRAINT "giga_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "giga_roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_school" ADD CONSTRAINT "giga_school_season_Id_fkey" FOREIGN KEY ("season_Id") REFERENCES "giga_season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "giga_contributed_data" ADD CONSTRAINT "giga_contributed_data_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "giga_season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_points" ADD CONSTRAINT "giga_points_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "giga_season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_points" ADD CONSTRAINT "giga_points_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_points" ADD CONSTRAINT "giga_points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_points" ADD CONSTRAINT "giga_points_contributedDataId_fkey" FOREIGN KEY ("contributedDataId") REFERENCES "giga_contributed_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_vote" ADD CONSTRAINT "giga_vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_vote" ADD CONSTRAINT "giga_vote_contributed_Id_fkey" FOREIGN KEY ("contributed_Id") REFERENCES "giga_contributed_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_vote" ADD CONSTRAINT "giga_vote_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "giga_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_validated_data" ADD CONSTRAINT "giga_validated_data_school_Id_fkey" FOREIGN KEY ("school_Id") REFERENCES "giga_school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giga_validated_data" ADD CONSTRAINT "giga_validated_data_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "giga_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
