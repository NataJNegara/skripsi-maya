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
import { District } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterDistrict = () => {
  const [districts, setDistricts] = useState([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const fetchDistricts = async () => {
        const data = await getDistricts();
        setDistricts(data);
      };
      fetchDistricts();
    } catch (err) {
      console.error(err);
      throw new Error("gagal mendapatkan data kecamatan");
    }
  }, []);

  const handleSelect = (districtId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("districtId", districtId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[360px]">
        <SelectValue placeholder="Cari berdasarkan kecamatan" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Kecamatan</SelectLabel>
          {districts.map((item: District) => (
            <SelectItem
              value={item.id}
              key={item.id}
              className="data-[state=checked]:[&_*]:text-white data-[state=checked]:bg-brand-secondary">
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterDistrict;
