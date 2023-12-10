/*
  Warnings:

  - You are about to drop the column `accountStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bvn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tos` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountStatus",
DROP COLUMN "bvn",
DROP COLUMN "createdAt",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "password",
DROP COLUMN "tos",
DROP COLUMN "updatedAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "updated" TIMESTAMP(3),
ADD COLUMN     "username" TEXT,
ADD COLUMN     "verified" BOOLEAN DEFAULT false,
ALTER COLUMN "email" DROP NOT NULL;

-- DropEnum
DROP TYPE "AccountStatus";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
