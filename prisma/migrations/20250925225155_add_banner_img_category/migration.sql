/*
  Warnings:

  - Added the required column `bannerImg` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "bannerImg" TEXT NOT NULL;
