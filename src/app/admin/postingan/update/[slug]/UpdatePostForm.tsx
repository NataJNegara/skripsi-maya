"use client";

import TipTap from "@/components/tiptap/TipTap";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePostAction } from "@/lib/actions/postActions";
import { updatePostSchema } from "@/lib/validator";
import { Post } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

const UpdatePostForm = ({ post }: { post: Post }) => {
  const form = useForm<z.infer<typeof updatePostSchema>>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: post,
  });

  const handleCreate = async (values: z.infer<typeof updatePostSchema>) => {
    const res = await updatePostAction(values);

    if (!res.success) {
      return toast.error(res.message);
    }

    toast.success(res.message);
    form.reset();
    redirect("/admin/postingan");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kategori..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BERITA">Berita</SelectItem>
                    <SelectItem value="EVENT">Event</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Judul" {...field} />
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
                      className="cursor-pointer"
                      onClick={() =>
                        form.setValue(
                          "slug",
                          slugify(form.getValues("title"), { lower: true })
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
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukan link gambar"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preview</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukan preview konten"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konten</FormLabel>
                <FormControl>
                  <TipTap description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
    </div>
  );
};

export default UpdatePostForm;
