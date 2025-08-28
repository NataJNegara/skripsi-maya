"use client";

import {
  addWishlistAction,
  deleteWishlistAction,
} from "@/lib/actions/wishlistActions";
import { Wishlist } from "@/types";
import { BookmarkMinus, BookmarkPlus, Loader, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type AddToWishlistButtonProps = {
  userId: string | undefined;
  destinationSlug: string;
  wishlist: Array<Wishlist>;
};

const AddToWhisListButton = ({
  userId,
  destinationSlug,
  wishlist,
}: AddToWishlistButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isItemInWishlist = wishlist.find(
    (item) => item.destination.slug === destinationSlug
  );

  const handleAddToWishlist = () => {
    startTransition(async () => {
      const res = await addWishlistAction(destinationSlug);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message, {
        action: {
          label: "Lihat Wishlist",
          onClick: () => router.push("/user/wishlist"),
        },
      });
    });
  };

  const handleDeleteWishlist = () => {
    startTransition(async () => {
      const res = await deleteWishlistAction(isItemInWishlist!.id);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message, {
        action: {
          label: "Lihat Wishlist",
          onClick: () => router.push("/user/wishlist"),
        },
      });
    });
  };

  return (
    <>
      {!userId && (
        <div className="md:ml-auto">
          <Link
            href={`/sign-in`}
            className="w-full md:w-fit flex justify-center items-center gap-4 py-3 px-6 bg-brand-accent! hover:bg-brand! transition-all duration-300 cursor-pointer font-semibold text-sm 2xl:text-lg text-brand-white-alt whitespace-nowrap">
            <LogIn />
            <span>Login</span>
          </Link>
        </div>
      )}

      {userId && !isItemInWishlist && (
        <div className="md:ml-auto">
          <button
            onClick={handleAddToWishlist}
            disabled={isPending}
            className="w-full md:w-64 h-12 lg:h-16 flex justify-center items-center gap-2 bg-brand-accent hover:bg-brand transition-all duration-300 cursor-pointer font-semibold text-sm 2xl:text-lg text-brand-white-alt whitespace-nowrap">
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <BookmarkPlus className="w-6 h-6 lg:w-8 lg:h-8" />
                Simpan ke Whislist
              </>
            )}
          </button>
        </div>
      )}

      {userId && isItemInWishlist && (
        <div className="md:ml-auto">
          <button
            onClick={handleDeleteWishlist}
            disabled={isPending}
            className="w-full md:w-64 h-12 lg:h-16 flex justify-center items-center gap-2 bg-transparent text-brand border border-brand hover:bg-brand transition-all duration-300 cursor-pointer font-semibold text-sm 2xl:text-lg hover:text-brand-white whitespace-nowrap">
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <BookmarkMinus className="w-6 h-6 lg:w-8 lg:h-8" />
                Hapus dari Whislist
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default AddToWhisListButton;
