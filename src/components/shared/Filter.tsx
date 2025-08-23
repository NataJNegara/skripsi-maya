"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type FilterProps = {
  filterField: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

const Filter = ({ filterField, options }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get(filterField) ?? "semua";

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set(filterField, filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex gap-2">
      {options.map((filter) => (
        <Button
          onClick={() => handleFilter(filter.value)}
          className={cn(
            "bg-transparent border border-brand text-brand px-4 md:px-6 py-2 cursor-pointer hover:bg-brand hover:text-brand-white-alt",
            activeFilter === filter.value && "bg-brand text-brand-white-alt"
          )}
          key={filter.value}>
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default Filter;
