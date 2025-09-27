"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDistricts } from "@/db/data-service";
import { getCategoriesSelect } from "@/lib/actions/categoryActions";
import { Category, District } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterCategory = () => {
  const [categories, setCategories] = useState<Category[] | null>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const data = await getCategoriesSelect();
        setCategories(data);
      };
      fetchCategories();
    } catch (err) {
      console.error(err);
      throw new Error("gagal mendapatkan data kecamatan");
    }
  }, []);

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", slug);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[360px] capitalize">
        <SelectValue
          placeholder="Cari berdasarkan kategori"
          className="capitalize"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Kategori</SelectLabel>
          {categories?.map((item: Category) => (
            <SelectItem
              value={item.slug}
              key={item.id}
              className="capitalize data-[state=checked]:[&_*]:text-white data-[state=checked]:bg-brand-secondary">
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterCategory;
