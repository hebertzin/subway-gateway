/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Manufacturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manufacturer" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
