/*
  Warnings:

  - Added the required column `updateAt` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "date_of_birth" SET DATA TYPE TEXT;
