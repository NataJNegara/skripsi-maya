"use server";

import { prisma } from "@/db/prisma";
import { PAGE_SIZE } from "../constant";
import { Prisma } from "@prisma/client";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertCategorySchema } from "../validator";

// =====================================GET ALL CATEGORY
type GetCategoriesActionProps = {
  page: number;
  searchQuery?: string;
  limit?: number;
};

export async function getCategories({
  page,
  searchQuery,
  limit = PAGE_SIZE,
}: GetCategoriesActionProps) {
  // filter search
  const filterSearch: Prisma.CategoryWhereInput =
    searchQuery !== "all" && searchQuery?.trim().length !== 0
      ? {
          OR: [{ name: { contains: searchQuery, mode: "insensitive" } }],
        }
      : {};

  const categories = await prisma.category.findMany({
    where: { ...filterSearch },
    include: {
      Destination: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
  });

  const totalData = await prisma.category.count({
    where: {
      ...filterSearch,
    },
  });

  return { categories, totalData, pageCount: Math.ceil(totalData / limit) };
}

// =====================================DELETE CATEGORY BY ID
export async function deleteCategoryAction(id: string) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("sesi tidak ditemukan");
    }

    if (session.user.role !== "ADMIN") {
      throw new Error("sesi tidak valid");
    }

    const category = await prisma.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw new Error("category tidak ditemukan");
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/kategori");
    revalidatePath("/destinasi");

    return {
      success: true,
      message: `kategori ${category.name} berhasil dihapus`,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Ooppss, terjadi kesalahan. coba lagi nanti",
    };
  }
}

// =====================================GET ALL CATEGORY (simplify)
export async function getCategoriesSelect() {
  const categories = await prisma.category.findMany();
  if (!categories) {
    return null;
  }

  return categories;
}

// =====================================CREATE CATEGORY
export async function createCategoryAction(
  data: z.infer<typeof insertCategorySchema>
) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("sesi tidak ditemukan");
    }

    if (session.user.role !== "ADMIN") {
      throw new Error("sesi tidak valid");
    }

    const validatedData = insertCategorySchema.parse(data);

    const isCategoryExist = await prisma.category.findFirst({
      where: { slug: validatedData.slug },
    });

    if (isCategoryExist) {
      throw new Error("Category dengan nama yang sama sudah digunakan.");
    }

    await prisma.category.create({
      data: validatedData,
    });

    revalidatePath("/destinasi");
    revalidatePath("/admin/kategori");

    return { success: true, message: "Kategori baru berhasil diatambahkan." };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Gagal menambahkan wisata, coba lagi nanti.",
    };
  }
}
