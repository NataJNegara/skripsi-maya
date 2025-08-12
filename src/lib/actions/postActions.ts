"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../auth";
import { insertPostSchema } from "../validator";

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
    revalidatePath("/blog");
    revalidatePath("/post");

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

export async function getPosts() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return posts;
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
