import { getMyWishlistAction } from "@/lib/actions/wishlistActions";
import { auth } from "@/lib/auth";
import WishlistCard from "./WishlistCard";
import Pagination from "@/components/shared/Pagination";

type WishlistListProps = {
  page: string;
  category: string;
};

const WishlistList = async ({ page, category }: WishlistListProps) => {
  const session = await auth();

  const { wishlist, dataCount, pageCount } = await getMyWishlistAction({
    userId: session?.user.id as string,
    page: Number(page),
    category,
  });

  if (!wishlist.length)
    return (
      <p className="text-gray-400 font-semibold italic text-center py-8">
        Belum ada wishlist.
      </p>
    );

  return (
    <>
      <p className="text-sm italic my-8">
        menampilkan {wishlist.length} dari {dataCount} wishlist.
      </p>

      <div className="space-y-2">
        {wishlist.map((wish) => (
          <WishlistCard wish={wish} key={wish.id} />
        ))}
      </div>

      {pageCount > 1 && <Pagination page={page} totalPages={pageCount} />}
    </>
  );
};

export default WishlistList;
