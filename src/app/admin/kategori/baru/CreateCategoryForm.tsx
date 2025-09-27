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
import { createCategoryAction } from "@/lib/actions/categoryActions";
import { insertCategorySchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

const initialValues: z.infer<typeof insertCategorySchema> = {
  name: "",
  slug: "",
  tagline: "",
  description: "",
  bannerImg: "",
};

const CreateCategoryForm = () => {
  const form = useForm<z.infer<typeof insertCategorySchema>>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: initialValues,
  });

  const { filesToStore, setFileToStore } = useFileUpload();

  useEffect(() => {
    setFileToStore([]);
  }, []);

  useEffect(() => {
    if (filesToStore.length > 0) {
      form.setValue("bannerImg", filesToStore[0].fileUrl);
    }
  }, [filesToStore, form]);

  const onSubmit = async (data: z.infer<typeof insertCategorySchema>) => {
    const res = await createCategoryAction(data);

    if (!res.success) {
      return toast.error(res.message);
    }

    // TODO: SET filesToStore back to null
    setFileToStore([]);
    toast.success(res.message);
    redirect("/admin/kategori");
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
          <UploaderSingle />
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

export default CreateCategoryForm;
