"use server";

import { prisma } from "@/db/prisma";
import { signUpFormSchema } from "@/lib/validator";
import bcrypt from "bcryptjs";
import { z } from "zod";

// =====================================SIGNUP
export async function signUpAction(data: z.infer<typeof signUpFormSchema>) {
  try {
    const validatedData = signUpFormSchema.parse(data);

    const isUserExist = await prisma.user.findFirst({
      where: { email: validatedData.email },
    });

    if (isUserExist) {
      throw new Error("Email sudah terdaftar!");
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(validatedData.password, salt);

    await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Selamat! akun anda berhasil dibuat.",
    };
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof Error) {
      return { success: false, message: err.message };
    }

    return {
      success: false,
      message: "Oppss terjadi kendala, coba lagi nanti.",
    };
  }
}
