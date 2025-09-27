import Pagination from "@/components/shared/Pagination";
import { getCategories } from "@/lib/actions/categoryActions";
import AdminKategoriCard from "./AdminKategoriCard";
import { CategoryWithDestination } from "@/types";

type KategoriListProps = {
  page: string;
  searchQuery: string;
};

const KategoriList = async ({ page, searchQuery }: KategoriListProps) => {
  const { categories, pageCount, totalData } = await getCategories({
    searchQuery,
    page: Number(page),
  });

  if (!categories)
    return <p className="text-sm italic text-center">belum ada kategori.</p>;

  return (
    <>
      <p className="text-sm italic my-8">
        menampilkan {categories.length} dari {totalData} kategori.
      </p>

      <div className="flex flex-col gap-4 mb-10">
        {categories.map((category) => (
          <AdminKategoriCard
            category={category as unknown as CategoryWithDestination}
            key={category.id}
          />
        ))}
      </div>

      {pageCount > 1 && <Pagination page={page} totalPages={pageCount} />}
    </>
  );
};

export default KategoriList;
