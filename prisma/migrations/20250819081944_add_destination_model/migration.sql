-- CreateTable
CREATE TABLE "public"."Destination" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "destination_slug_idx" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "bannerImg" TEXT NOT NULL,
    "destinationImages" TEXT[],
    "coordinate" JSONB NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Destination_destination_slug_idx_key" ON "public"."Destination"("destination_slug_idx");
