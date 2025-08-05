import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("Email tidak sesuai"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(4, "Nama harus mengandung 4 karakter"),
    email: z.string().email("Email tidak sesuai"),
    password: z
      .string()
      .min(1, "Password wajib diisi")
      .min(8, "Password harus mengandung 8 karakter")
      .trim(),
    confirmPassword: z
      .string()
      .min(1, "Konfirmasi password wajib diisi")
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });
