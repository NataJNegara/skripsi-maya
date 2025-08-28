import Pagination from "@/components/shared/Pagination";
import { getMyWishlistAction } from "@/lib/actions/wishlistActions";
import Link from "next/link";
import WishlistCard from "./WishlistCard";

type WishlistListProps = {
  page: string;
  category: string;
};

const WishlistList = async ({ page, category }: WishlistListProps) => {
  const { wishlist, dataCount, pageCount } = await getMyWishlistAction({
    page: Number(page),
    category,
  });

  if (!wishlist.length)
    return (
      <div className="flex flex-col gap-2 items-center justify-center py-8">
        <p className="text-gray-400 font-semibold italic text-center">
          Belum ada wishlist.
        </p>
        <Link
          href={`/destinasi`}
          className="bg-brand hover:bg-brand-secondary text-brand-white-alt px-6 p-2 font-semibold transition-all duration-300">
          Tambah wishlist
        </Link>
      </div>
    );

  return (
    <>
      <p className="text-sm italic my-8">
        menampilkan {wishlist.length} dari {dataCount} wishlist.
      </p>

      <div className="space-y-4">
        {wishlist.map((wish) => (
          <WishlistCard wish={wish} key={wish.id} />
        ))}
      </div>

      {pageCount > 1 && <Pagination page={page} totalPages={pageCount} />}
    </>
  );
};

export default WishlistList;
