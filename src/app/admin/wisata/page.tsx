import SearchBar from "@/components/SearchBar";
import Spinner from "@/components/Spinner";
import Filter from "@/components/shared/Filter";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import WisataList from "./WisataList";

type WisataPageProps = {
  searchParams: Promise<{
    page?: string;
    searchQuery?: string;
    category?: string;
  }>;
};

const Page = async ({ searchParams }: WisataPageProps) => {
  const {
    page = "1",
    category = "SEMUA",
    searchQuery = "",
  } = await searchParams;

  return (
    <div className="">
      <div className="flex items-center justify-between mb-12">
        <p className="dashboard-title">Wisata</p>
        <div className="flex justify-end">
          <Link
            href="/admin/wisata/baru"
            className="bg-brand-accent hover:bg-orange-700 transition-all duration-300 px-4 py-2 text-indigo-50 flex items-center gap-2">
            <span>Wisata baru</span>
            <CirclePlus size={20} />
          </Link>
        </div>
      </div>

      {/* searchbar & filter */}
      <div className="flex justify-between mb-8">
        <SearchBar />
        <div className="">
          <Filter
            filterField="category"
            options={[
              { label: "Semua", value: "SEMUA" },
              { label: "Alam", value: "ALAM" },
              { label: "Budaya", value: "BUDAYA" },
              { label: "Buatan", value: "BUATAN" },
            ]}
          />
        </div>
      </div>

      {searchQuery.length > 0 && (
        <p className="uppercase text-xs font-semibold">
          <span>Hasil pencarian untuk &quot;{searchQuery}&quot;</span>
          <Link
            href="/admin/wisata"
            className="ml-2 bg-brand text-white rounded-full px-3">
            Hapus
          </Link>
        </p>
      )}

      {/* table content */}
      <Suspense fallback={<Spinner />}>
        <WisataList page={page} category={category} searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
};

export default Page;
