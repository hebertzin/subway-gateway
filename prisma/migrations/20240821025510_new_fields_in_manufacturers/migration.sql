/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Roles` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `Manufacturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manufacturer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "updateAt";
