"use client";

import { addWishlistAction } from "@/lib/actions/wishlistActions";
import { BookmarkPlus, LogIn } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

type AddToWishlistButtonProps = {
  userId: string | undefined;
  destinationSlug: string;
};

const AddToWhisListButton = ({
  userId,
  destinationSlug,
}: AddToWishlistButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleAddToWishlist = () => {
    startTransition(async () => {
      const res = await addWishlistAction(destinationSlug);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
    });
  };

  return (
    <>
      {userId ? (
        <div className="md:ml-auto">
          <button
            onClick={handleAddToWishlist}
            disabled={isPending}
            className="w-full md:w-fit flex justify-center items-center gap-2 py-3 px-6 bg-brand-accent hover:bg-brand transition-all duration-300 cursor-pointer font-semibold text-sm 2xl:text-lg text-brand-white-alt whitespace-nowrap">
            <BookmarkPlus className="w-5 h-5 2xl:w-8 2xl:h-8" />
            Simpan ke Whislist
          </button>
        </div>
      ) : (
        <div className="md:ml-auto">
          <Link
            href={`/sign-in`}
            className="w-full md:w-fit flex justify-center items-center gap-4 py-3 px-6 bg-brand-accent! hover:bg-brand! transition-all duration-300 cursor-pointer font-semibold text-sm 2xl:text-lg text-brand-white-alt whitespace-nowrap">
            <LogIn />
            <span>Login</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default AddToWhisListButton;
