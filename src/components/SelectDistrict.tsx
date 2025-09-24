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

const SelectDistrict = () => {
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
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Kecamatan" />
      </SelectTrigger>
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
  );
};

export default SelectDistrict;
