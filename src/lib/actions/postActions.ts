"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { auth } from "../auth";
import { insertPostSchema } from "../validator";
import { PAGE_SIZE } from "../constant";
import { Prisma } from "@prisma/client";
import { unstable_cacheTag as cacheTag } from "next/cache";

// ===================================================================================CREATE POST
export async function addPostActions(data: z.infer<typeof insertPostSchema>) {
  try {
    const session = await auth();
    if (!session) throw new Error("Sesi tidak ditemukan!");

    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });

    if (!user) throw new Error("Sesi tidak valid!");

    const validatedData = insertPostSchema.parse(data);

    await prisma.post.create({
      data: {
        category: validatedData.category,
        title: validatedData.title,
        slug: validatedData.slug,
        banner: validatedData.banner,
        preview: validatedData.preview,
        content: validatedData.content,
      },
    });

    revalidatePath("/admin/postingan");
    revalidatePath("/berita");
    revalidatePath("/event");

    return { success: true, message: "Postingan baru berhasil ditambahkan." };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: "Gagal membuat postingan. Coba lagi nanti.",
    };
  }
}

// ==============================================================GET POSTS(ALL)

type GetPostType = {
  page: number;
  limit?: number;
  searchQuery?: string;
  category?: string;
};

export async function getPosts({
  page,
  limit = PAGE_SIZE,
  searchQuery,
  category,
}: GetPostType) {
  // cache
  "use cache";
  cacheTag("posts-data");

  const searchFilter: Prisma.PostWhereInput =
    searchQuery && searchQuery.trim().length > 0
      ? {
          OR: [{ title: { contains: searchQuery, mode: "insensitive" } }],
        }
      : {};

  const categoryFilter: Prisma.PostWhereInput =
    category !== "SEMUA" && category?.length !== 0 ? { category } : {};

  const [posts, totalData] = await Promise.all([
    // get posts
    await prisma.post.findMany({
      where: {
        ...categoryFilter,
        ...searchFilter,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    }),

    // post count
    await prisma.post.count({
      where: {
        ...categoryFilter,
        ...searchFilter,
      },
    }),
  ]);

  return { posts, totalData, pageCount: Math.ceil(totalData / limit) };
}

// ==============================================================GET POSTS(BERITA)
export async function getBeritas() {
  const beritas = await prisma.post.findMany({
    where: { category: "BERITA" },
    orderBy: { createdAt: "desc" },
  });

  return beritas;
}

// ==============================================================GET POST BY SLUG
export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findFirst({
    where: { slug },
  });

  return post;
}

// ==============================================================GET POSTS(EVENT)
export async function getEvents() {
  const events = await prisma.post.findMany({
    where: { category: "EVENT" },
    orderBy: { createdAt: "desc" },
  });

  return events;
}

// ==============================================================DELETE POST BY ID
export async function deletePostAction(id: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Sesi tidak ditemukan");
    }

    if (session.user.role !== "ADMIN") {
      throw new Error("Sesi tidak valid");
    }

    const post = await prisma.post.findFirst({
      where: { id },
    });

    if (!post) {
      throw new Error("Post tidak ditemukan");
    }

    await prisma.post.delete({
      where: { id },
    });

    revalidateTag("posts-data");
    revalidatePath("/admin/postingan");
    revalidatePath("/event");
    revalidatePath("/berita");

    return {
      success: true,
      message: "Postingan berhasil dihapus.",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Ooppss... terjadi kesalahan, coba lagi nanti.",
    };
  }
}
