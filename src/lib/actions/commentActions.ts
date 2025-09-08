"use server";

import { prisma } from "@/db/prisma";
import { z } from "zod";
import { insertCommentSchema } from "../validator";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

// =====================================GET COMMENTS
export async function getComment(destinationId: string) {
  const comments = await prisma.comment.findMany({
    where: { destinationId },
    include: {
      user: {
        select: { name: true, email: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return { comments };
}

// =====================================ADD COMMENT
export async function addCommentAction(
  data: z.infer<typeof insertCommentSchema>
) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Sesi tidak ditemukan");
    }

    const validatedData = insertCommentSchema.parse(data);

    const destination = await prisma.destination.findFirst({
      where: { id: validatedData.destinationId },
    });

    if (!destination) {
      throw new Error("Destinasi wisata tidak ditemukan.");
    }

    await prisma.comment.create({ data: validatedData });

    revalidatePath(`/destinasi/${destination.slug}`);

    return {
      success: true,
      message: "Komentar baru ditambahkan.",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Gagal menambahkan komentar. coba lagi nanti.",
    };
  }
}

// =====================================DELETE COMMENT
export async function deleteCommentAction(id: string) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Sesi tidak ditemukan.");
    }

    const comment = await prisma.comment.findFirst({
      where: { id },
      include: {
        destination: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (!comment) {
      throw new Error("Comment tidak ditemukan.");
    }

    if (session.user.id !== comment.userId && session.user.role !== "ADMIN") {
      throw new Error("Unauthorized: sesi tidak valid.");
    }

    await prisma.comment.delete({
      where: { id },
    });

    revalidatePath(`/destinasi/${comment.destination.slug}`);

    return { success: true, message: "komentar berhasil di hapus." };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Opps terjadi kesalah, coba lagi nanti.",
    };
  }
}
