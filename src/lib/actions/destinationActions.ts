"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../auth";
import { insertDestinationSchema } from "../validator";
import { Prisma } from "@prisma/client";

// =========================CREATE
export async function createDestinationAction(
  data: z.infer<typeof insertDestinationSchema>
) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Sesi tidak ditemukan");
    }

    if (session.user.role !== "ADMIN") {
      throw new Error("Sesi tidak valid");
    }

    const validatedData = insertDestinationSchema.parse(data);

    const isWisataExist = await prisma.destination.findFirst({
      where: { slug: validatedData.slug },
    });

    if (isWisataExist) {
      throw new Error("Wisata dengan nama yang sama sudah digunakan.");
    }

    await prisma.destination.create({
      data: {
        ...validatedData,
        coordinate: {
          lat: Number(validatedData.coordinate.lat),
          lng: Number(validatedData.coordinate.lng),
        },
      },
    });

    revalidatePath("/destinasi");
    revalidatePath("/admin/wisata");

    return { success: true, message: "Wisata baru berhasil diatambahkan." };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Gagal menambahkan wisata, coba lagi nanti.",
    };
  }
}

// =========================GET ALL
export async function getDestinations({ tag }: { tag?: string }) {
  // filter wisata by its tag
  const wisataFilter: Prisma.DestinationWhereInput =
    tag !== "SEMUA" && tag?.length !== 0 ? { tag } : {};

  const destinations = await prisma.destination.findMany({
    where: {
      ...wisataFilter,
    },
  });

  if (!destinations) return null;

  return destinations;
}

// =========================GET BY SLUG
export async function getDestinationBySlug(slug: string) {
  const destination = await prisma.destination.findFirst({
    where: { slug },
  });

  if (!destination) return null;

  return destination;
}
