"use server";

import { prisma } from "@/db/prisma";
import { auth } from "../auth";
import { formatError } from "../utils";
import { PAGE_SIZE } from "../constant";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

// ============================================ADD WISHLIST
export async function addWishlistAction(slug: string) {
  try {
    const session = await auth();

    if (!session || !session.user.id) {
      throw new Error("sesi tidak ditemukan");
    }

    const destination = await prisma.destination.findFirst({
      where: { slug },
    });

    if (!destination) {
      throw new Error("Wisata tidak ditemukan");
    }

    const isAlreadyWishlisted = await prisma.wishlist.findFirst({
      where: {
        AND: [{ destinationId: destination.id }, { userId: session.user.id }],
      },
    });

    if (isAlreadyWishlisted) {
      throw new Error("Destinasi sudah terdaftar di whislist anda");
    }

    await prisma.wishlist.create({
      data: {
        userId: session.user.id,
        destinationId: destination.id,
      },
    });

    return {
      success: true,
      message: "Wisata berhasil di tambahkan ke wishlist.",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: formatError(err),
    };
  }
}

// ============================================GET ALL WISHLIST
type GetMyWishlistActionProps = {
  userId: string;
  category?: string;
  page: number;
  limit?: number;
};

export async function getMyWishlistAction({
  userId,
  category,
  page,
  limit = PAGE_SIZE,
}: GetMyWishlistActionProps) {
  const categoryFilter: Prisma.WishlistWhereInput =
    category !== "SEMUA" && category?.length !== 0
      ? { destination: { tag: category } }
      : {};

  const wishlist = await prisma.wishlist.findMany({
    where: { userId, ...categoryFilter },
    include: {
      destination: true,
    },
    skip: (page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  const dataCount = await prisma.wishlist.count({
    where: { userId, ...categoryFilter },
  });

  return { wishlist, dataCount, pageCount: Math.ceil(dataCount / limit) };
}

// ============================================DELETE WISHLIST BY ID
export async function deleteWishlistAction(id: string) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Sesi tidak ditemukan.");
    }

    const wishlist = await prisma.wishlist.findFirst({
      where: { id },
      include: {
        destination: true,
      },
    });

    if (wishlist?.userId !== session.user.id) {
      throw new Error("Sesi tidak valid");
    }

    await prisma.wishlist.delete({
      where: { id },
    });

    revalidatePath("/user/wishlist");
    revalidatePath(`/destinasi/${wishlist?.destination.slug}`);

    return { success: true, message: "Wishlist berhasil diperbarui." };
  } catch (err) {
    console.error(err);
    return { success: false, message: formatError(err) };
  }
}
