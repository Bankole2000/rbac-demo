/*
  Warnings:

  - Added the required column `updated` to the `UserFeatureBan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFeatureBan" ADD COLUMN     "counter" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "expiresAt" DROP NOT NULL;
