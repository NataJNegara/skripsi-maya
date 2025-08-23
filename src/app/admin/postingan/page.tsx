import SearchBar from "@/components/SearchBar";
import Spinner from "@/components/Spinner";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import { getPosts } from "@/lib/actions/postActions";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import PostList from "./PostList";

type PostPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    searchQuery?: string;
  }>;
};

const Page = async ({ searchParams }: PostPageProps) => {
  const {
    page = "1",
    category = "SEMUA",
    searchQuery = "",
  } = await searchParams;

  const { posts, totalData, pageCount } = await getPosts({
    page: Number(page),
    category,
    searchQuery,
  });

  return (
    <div className="">
      <div className="flex items-center justify-between mb-12">
        <p className="dashboard-title">Postingan</p>
        <div className="flex justify-end">
          <Link
            href="/admin/postingan/baru"
            className="bg-brand-accent hover:bg-orange-700 transition-all duration-300 px-4 py-2 text-indigo-50 flex items-center gap-2">
            <span>Postingan baru</span>
            <CirclePlus />
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
              { label: "Berita", value: "BERITA" },
              { label: "Event", value: "EVENT" },
            ]}
          />
        </div>
      </div>

      {searchQuery.length > 0 && (
        <p className="uppercase text-xs font-semibold">
          <span>Hasil pencarian untuk &quot;{searchQuery}&quot;</span>
          <Link
            href="/admin/postingan"
            className="ml-2 bg-brand text-white rounded-full px-3">
            Hapus
          </Link>
        </p>
      )}

      <p className="text-sm italic my-8">
        menampilkan {posts.length} dari {totalData} postingan.
      </p>

      {/* table of content */}
      <Suspense fallback={<Spinner />}>
        <PostList posts={posts} />
      </Suspense>

      {pageCount > 1 && <Pagination page={page} totalPages={pageCount} />}
    </div>
  );
};

export default Page;
