"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("wisata") ?? "semua";

  const queryFilter = [
    { title: "Semua", value: "semua" },
    { title: "Alam", value: "alam" },
    { title: "Buatan", value: "buatan" },
    { title: "Budaya", value: "budaya" },
  ];

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("wisata", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-2 md:gap-4">
      {queryFilter.map((filter) => (
        <Button
          onClick={() => handleFilter(filter.value)}
          className={cn(
            "bg-transparent border border-brand text-brand px-4 md:px-6 py-2 cursor-pointer hover:bg-brand hover:text-brand-white-alt",
            activeFilter === filter.value && "bg-brand text-brand-white-alt"
          )}
          key={filter.value}>
          {filter.title}
        </Button>
      ))}
    </div>
  );
};

export default Filter;
