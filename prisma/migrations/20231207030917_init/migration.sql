-- CreateEnum
CREATE TYPE "DataType" AS ENUM ('boolean', 'number', 'string', 'list', 'object', 'objectList');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('PENDING', 'SUCCESSFUL', 'REVERSED', 'FAILED');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('NEW', 'BIO_INCOMPLETE', 'BVN_REQUIRED', 'NEEDS_ACCOUNT', 'COMPLETE');

-- CreateEnum
CREATE TYPE "Service" AS ENUM ('BACKEND', 'FRONTEND');

-- CreateTable
CREATE TABLE "AppSetting" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DataType" NOT NULL,
    "boolean" BOOLEAN DEFAULT false,
    "number" INTEGER,
    "string" TEXT,
    "list" TEXT[],
    "object" JSONB,
    "objectList" JSONB[],

    CONSTRAINT "AppSetting_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'NEW',
    "firstname" TEXT,
    "lastname" TEXT,
    "tos" BOOLEAN NOT NULL DEFAULT false,
    "bvn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "loggedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loggedOutAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHasBeneficiary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHasBeneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "transferId" TEXT,
    "type" "TransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "originAccountId" TEXT NOT NULL,
    "destinationAccountId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "status" "TransferStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scope" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scope" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "FeatureFlag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "service" "Service"[] DEFAULT ARRAY['BACKEND']::"Service"[],
    "feature" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("name","feature")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "create" BOOLEAN NOT NULL,
    "readOwn" BOOLEAN NOT NULL,
    "readAny" BOOLEAN NOT NULL,
    "updateOwn" BOOLEAN NOT NULL,
    "updateAny" BOOLEAN NOT NULL,
    "deleteOwn" BOOLEAN NOT NULL,
    "deleteAny" BOOLEAN NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("role","resource")
);

-- CreateTable
CREATE TABLE "UserFeatureBan" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFeatureBan_pkey" PRIMARY KEY ("user","feature")
);

-- CreateTable
CREATE TABLE "_UserHasRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AppSetting_id_key" ON "AppSetting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AppSetting_name_key" ON "AppSetting"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Scope_id_key" ON "Scope"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Scope_name_key" ON "Scope"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_id_key" ON "Feature"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureFlag_id_key" ON "FeatureFlag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_id_key" ON "Resource"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_id_key" ON "RolePermission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFeatureBan_id_key" ON "UserFeatureBan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_UserHasRoles_AB_unique" ON "_UserHasRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserHasRoles_B_index" ON "_UserHasRoles"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasBeneficiary" ADD CONSTRAINT "UserHasBeneficiary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasBeneficiary" ADD CONSTRAINT "UserHasBeneficiary_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "Transfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_originAccountId_fkey" FOREIGN KEY ("originAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_destinationAccountId_fkey" FOREIGN KEY ("destinationAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_scope_fkey" FOREIGN KEY ("scope") REFERENCES "Scope"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureFlag" ADD CONSTRAINT "FeatureFlag_feature_fkey" FOREIGN KEY ("feature") REFERENCES "Feature"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_resource_fkey" FOREIGN KEY ("resource") REFERENCES "Resource"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFeatureBan" ADD CONSTRAINT "UserFeatureBan_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFeatureBan" ADD CONSTRAINT "UserFeatureBan_feature_fkey" FOREIGN KEY ("feature") REFERENCES "Feature"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHasRoles" ADD CONSTRAINT "_UserHasRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHasRoles" ADD CONSTRAINT "_UserHasRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
