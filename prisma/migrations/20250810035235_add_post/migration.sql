-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('EVENT', 'POST');

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL DEFAULT 'POST',
    "title" TEXT NOT NULL,
    "post_slug_idx" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_post_slug_idx_key" ON "public"."Post"("post_slug_idx");
