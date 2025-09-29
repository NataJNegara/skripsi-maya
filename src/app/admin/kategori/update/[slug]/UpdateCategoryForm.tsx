"use client";

import UploaderSingle from "@/components/UploaderSingle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFileUpload } from "@/context/FileUploadContext";
import { updateCategoryAction } from "@/lib/actions/categoryActions";
import { updateCategorySchema } from "@/lib/validator";
import { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

const UpdateCategoryForm = ({ category }: { category: Category }) => {
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const form = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: category,
  });

  const { filesToStore, onUpload, setFileToStore } = useFileUpload();

  useEffect(() => {
    if (category.bannerImg) {
      setFileToStore([]);
      onUpload({ fileUrl: category.bannerImg });
    }
  }, []);

  useEffect(() => {
    if (filesToStore.length > 0) {
      form.setValue("bannerImg", filesToStore[0].fileUrl);
    }
  }, [filesToStore]);

  const onSubmit = async (values: z.infer<typeof updateCategorySchema>) => {
    const res = await updateCategoryAction(values);

    if (!res.success) {
      return toast.error(res.message);
    }

    toast.success(res.message);
    redirect("/admin/kategori");
  };

  const deleteImage = async (fileUrl: string) => {
    try {
      setIsDeletingImage(true);
      const imageKey = fileUrl.split("/")[3];

      const res = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: imageKey,
        }),
      });

      if (!res.ok) {
        return toast.error("Gagal menghapus gamba");
      }

      const { message } = await res.json();
      setFileToStore([]);
      toast.success(message);
    } catch (err) {
      console.error(err);
      toast.error("Oopss terjadi kesalahan, coba lagi nanti");
    } finally {
      setIsDeletingImage(false);
    }
  };

  const nameValue = form.watch("name");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input type="text" placeholder="nama kategori" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input type="text" placeholder="slug" disabled {...field} />
                  <Button
                    type="button"
                    className="button-small"
                    disabled={!nameValue}
                    onClick={() =>
                      form.setValue(
                        "slug",
                        slugify(form.getValues("name"), { lower: true })
                      )
                    }>
                    Buat slug
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input type="text" placeholder="tagline wisata" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tulis deskripsi wisata..."
                  className="resize-none rounded-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">Gambar Kategori</p>
          {!filesToStore.length ? (
            <UploaderSingle />
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2">
              {filesToStore.map((item) => (
                <div key={item.fileUrl} className="flex flex-col gap-1">
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={item.fileUrl}
                      alt={`${category.name} images`}
                      width={200}
                      height={100}
                      className="object-cover w-full h-full"
                    />

                    {/*  DELETE BUTTON */}
                    <Button
                      variant="destructive"
                      type="button"
                      className="absolute top-2 right-2 cursor-pointer"
                      disabled={isDeletingImage}
                      onClick={() => deleteImage(item.fileUrl)}>
                      {isDeletingImage ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Trash2Icon />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="cursor-pointer button-small bg-brand! hover:bg-brand-secondary!"
            disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              "Simpan"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateCategoryForm;
