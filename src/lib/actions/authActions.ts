"use server";

import { prisma } from "@/db/prisma";
import { signInFormSchema, signUpFormSchema } from "@/lib/validator";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "../auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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

// =====================================SIGNIN-WITH-CREDENTIALS
export async function signInWithCredential(
  data: z.infer<typeof signInFormSchema>
) {
  try {
    const validatedData = signInFormSchema.parse({
      email: data.email,
      password: data.password,
    });

    await signIn("credentials", validatedData);

    return { success: true, message: `Behasil login ke akun anda.` };
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      console.error(err);
      throw err;
    }

    return {
      success: false,
      message: "Email atau password salah.",
    };
  }
}
