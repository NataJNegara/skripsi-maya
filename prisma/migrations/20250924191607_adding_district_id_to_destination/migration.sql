/*
  Warnings:

  - Added the required column `districtId` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Destination" ADD COLUMN     "districtId" TEXT NOT NULL;
