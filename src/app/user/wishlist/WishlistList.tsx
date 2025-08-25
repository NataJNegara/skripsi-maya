import { getMyWishlistAction } from "@/lib/actions/wishlistActions";
import { auth } from "@/lib/auth";
import WishlistCard from "./WishlistCard";

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
    <div className="space-y-2">
      {wishlist.map((wish) => (
        <WishlistCard wish={wish} key={wish.id} />
      ))}
    </div>
  );
};

export default WishlistList;
