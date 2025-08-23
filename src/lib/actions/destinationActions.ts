"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath, unstable_cacheTag as cacheTag } from "next/cache";
import { z } from "zod";
import { auth } from "../auth";
import { insertDestinationSchema } from "../validator";
import { Prisma } from "@prisma/client";
import { PAGE_SIZE } from "../constant";

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

// =========================GET ALL ADMIN DASHBOARD

type GetDestinationsAdminProps = {
  tag?: string;
  searchQuery?: string;
  page: number;
  limit?: number;
};

export async function getDestinationsAdmin({
  tag,
  searchQuery,
  page,
  limit = PAGE_SIZE,
}: GetDestinationsAdminProps) {
  // cache
  "use cache";
  cacheTag("destinations-data");

  // filter wisata by its tag
  const wisataFilter: Prisma.DestinationWhereInput =
    tag !== "SEMUA" && tag?.length !== 0 ? { tag } : {};

  const searchFilter: Prisma.DestinationWhereInput =
    searchQuery && searchQuery.trim().length > 0
      ? {
          OR: [{ title: { contains: searchQuery, mode: "insensitive" } }],
        }
      : {};

  const destinations = await prisma.destination.findMany({
    where: {
      ...wisataFilter,
      ...searchFilter,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalData = await prisma.destination.count({
    where: {
      ...wisataFilter,
      ...searchFilter,
    },
  });

  return { destinations, pageCount: Math.ceil(totalData / limit), totalData };
}

// ============================DELETE WISATA BY ID
export async function deleteDestinationById(id: string) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Sesi tidak ditemukan");
    }

    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });

    if (!user || user.role !== "ADMIN" || session.user.role !== "ADMIN") {
      throw new Error("Sesi tidak valid");
    }

    const destination = await prisma.destination.findFirst({
      where: { id },
    });

    if (!destination) {
      throw new Error("Wisata tidak ditemukan");
    }

    await prisma.destination.delete({
      where: { id },
    });

    revalidatePath("/admin/wisata");
    revalidatePath("/destinasi");

    return {
      success: true,
      message: "Destinasi wisata berhasil dihapus.",
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Ooppss, terjadi kesalahan. coba lagi nanti",
    };
  }
}
