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

export const insertPostSchema = z.object({
  category: z.string().min(1, "Kategori harus diisi."),
  title: z.string().min(6, "Judul harus diisi."),
  slug: z.string().min(1, "Slug harus diisi."),
  banner: z.string().min(1, "Banner harus diisi."),
  preview: z
    .string()
    .min(10, "Tuliskan preview yang sesuai.")
    .max(150, "Preview tidak boleh lebih dari 150 karakter"),
  content: z.string().min(6, "Konten tarlalu singkat."),
});
