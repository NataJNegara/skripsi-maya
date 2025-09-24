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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFileUpload } from "@/context/FileUploadContext";
import { getDistricts } from "@/db/data-service";
import { createDestinationAction } from "@/lib/actions/destinationActions";
import { insertDestinationSchema } from "@/lib/validator";
import { District } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

const destinationDefaultValues: z.infer<typeof insertDestinationSchema> = {
  title: "",
  slug: "",
  tag: "",
  preview: "",
  bannerImg: "",
  destinationImages: [],
  content: "",
  coordinate: { lat: "", lng: "" },
  districtId: "",
  location: "",
};

const CreateWisataForm = () => {
  const [districts, setDistricts] = useState([]);

  const form = useForm<z.infer<typeof insertDestinationSchema>>({
    resolver: zodResolver(insertDestinationSchema),
    defaultValues: destinationDefaultValues,
  });

  const { filesToStore, setFileToStore } = useFileUpload();

  const onSubmit = async (data: z.infer<typeof insertDestinationSchema>) => {
    const res = await createDestinationAction(data);

    if (!res.success) {
      return toast.error(res.message);
    }

    // TODO: SET filesToStore back to null
    setFileToStore([]);
    toast.success(res.message);
    redirect("/admin/wisata");
  };

  useEffect(() => {
    const fetchDistrict = async () => {
      const data = await getDistricts();
      setDistricts(data);
    };

    fetchDistrict();
    setFileToStore([]);
  }, []);

  useEffect(() => {
    if (filesToStore.length > 0) {
      // set banner image
      form.setValue("bannerImg", filesToStore[0].fileUrl);

      // set all images
      form.setValue(
        "destinationImages",
        filesToStore.map((item) => item.fileUrl)
      );
    }
  }, [filesToStore, form]);

  const titleValue = form.watch("title");

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
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konten</FormLabel>
              <FormControl>
                <TipTap description={field.name} onChange={field.onChange} />
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
          name="districtId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kecamatan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kecamatan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kecamatan</SelectLabel>
                    {districts.map((item: District) => (
                      <SelectItem value={item.id} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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

export default CreateWisataForm;
