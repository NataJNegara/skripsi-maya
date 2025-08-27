"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/postingan")
    ? "/admin/postingan"
    : pathname.includes("/admin/wisata")
    ? "/admin/wisata"
    : "/destinasi";

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <form
      method="GET"
      action={formActionUrl}
      className="w-full md:w-1/4 flex gap-2">
      <Input
        className="placeholder:text-sm"
        type="search"
        name="searchQuery"
        placeholder="pencarian..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button className="cursor-pointer bg-brand hover:bg-brand-secondary">
        <Search />
      </Button>
    </form>
  );
};

export default SearchBar;
