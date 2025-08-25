"use client";

import Uploader from "@/components/Uploader";
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
import { Textarea } from "@/components/ui/textarea";
import { useFileUpload } from "@/context/FileUploadContext";
import { updateDestinationAction } from "@/lib/actions/destinationActions";
import { coordinateSchema, updateDestinationSchema } from "@/lib/validator";
import { Destination } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

const UpdateWisataForm = ({ destination }: { destination: Destination }) => {
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const form = useForm<z.infer<typeof updateDestinationSchema>>({
    resolver: zodResolver(updateDestinationSchema),
    defaultValues: {
      ...destination,
      coordinate: destination.coordinate as z.infer<typeof coordinateSchema>,
    },
  });

  const { filesToStore, onUpload, setFileToStore } = useFileUpload();

  const onSubmit = async (data: z.infer<typeof updateDestinationSchema>) => {
    const res = await updateDestinationAction(data);

    if (!res.success) {
      return toast.error(res.message);
    }

    toast.success(res.message);
    redirect("/admin/wisata");
  };

  useEffect(() => {
    if (destination.destinationImages.length > 0) {
      setFileToStore([]);

      destination.destinationImages.map((item) => onUpload({ fileUrl: item }));
    }
  }, []);

  useEffect(() => {
    if (filesToStore.length > 0) {
      // set all images
      form.setValue(
        "destinationImages",
        filesToStore.map((item) => item.fileUrl)
      );
    }
  }, [filesToStore]);

  const titleValue = form.watch("title");

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
        return toast.error("Failed to delete image");
      }

      const { message } = await res.json();
      toast.success(message);
      setFileToStore((prev) => prev.filter((item) => item.fileUrl !== fileUrl));
    } catch (err) {
      console.error(err);
      toast.error("Oopss terjadi kesalahan, coba lagi nanti");
    } finally {
      setIsDeletingImage(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    className="button-small"
                    disabled={!titleValue}
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
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih tag..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ALAM">Alam</SelectItem>
                  <SelectItem value="BUATAN">Buatan</SelectItem>
                  <SelectItem value="BUDAYA">Budaya</SelectItem>
                </SelectContent>
              </Select>
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
                <Textarea
                  placeholder="Tulis preview konten..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">Gambar Wisata</p>
          <Uploader />

          {/* old image */}
          <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-2">
            {filesToStore.map((item) => (
              <div key={item.fileUrl} className="flex flex-col gap-1">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={item.fileUrl}
                    alt={`${destination.title} images`}
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
        </div>

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

        <FormField
          control={form.control}
          name="coordinate.lat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="latitude"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coordinate.lng"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="longitude"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lokasi</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Lokasi" {...field} />
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
  );
};

export default UpdateWisataForm;
