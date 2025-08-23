"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number | string;
  totalPages: number;
};

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePagination = (btnType: string) => {
    const currPage = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const params = new URLSearchParams(searchParams);
    params.set("page", currPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-8 items-center justify-end">
      <Button
        className="bg-brand! hover:bg-brand-secondary! cursor-pointer flex items-center gap-2"
        onClick={() => handlePagination("previous")}
        disabled={Number(page) <= 1}>
        <ChevronLeft />
        <span>Sebelumnya</span>
      </Button>
      <Button
        className="bg-brand! hover:bg-brand-secondary! cursor-pointer flex items-center gap-2"
        onClick={() => handlePagination("next")}
        disabled={Number(page) >= totalPages}>
        <span>Selanjutnya</span>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
