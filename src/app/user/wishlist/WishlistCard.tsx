import DeleteDialog from "@/components/shared/DeleteDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteWishlistAction } from "@/lib/actions/wishlistActions";
import { formatDateTime, textShorter } from "@/lib/utils";
import { Wishlist } from "@/types";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WishlistCard = ({ wish }: { wish: Wishlist }) => {
  return (
    <div
      className="flex flex-col md:flex-row border border-brand-secondary"
      key={wish.id}>
      <div className="relative h-48 md:h-32 aspect-square">
        <Image
          src={wish.destination.bannerImg}
          alt={`image of ${wish.destination.title}`}
          fill
          className="object-cover border-r border-brand-secondary"
        />
      </div>

      <div className="flex flex-col flex-grow px-4 py-2 md:px-6 md:py-2">
        <div className="flex flex-col gap-2">
          <Link
            href={`/destinasi/${wish.destination.slug}`}
            className="text-lg font-semibold capitalize">
            {wish.destination.title}
          </Link>
          <p className="text-sm">{textShorter(wish.destination.preview)}</p>
        </div>
        <div className="py-2 flex items-center mt-auto">
          <Badge className="capitalize text-xs px-4 rounded-full bg-brand-secondary">
            {wish.destination.category.name}
          </Badge>
          <p className="ml-auto text-xs md:text-sm text-gray-400">
            {formatDateTime(wish.createdAt).dateOnly}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-t md:border-t-0 md:border-l border-brand-secondary w-full md:w-[100px]">
        <Button
          asChild
          className="rounded-none bg-transparent hover:bg-brand-secondary text-brand hover:text-brand-white-alt">
          <Link
            href={`/destinasi/${wish.destination.slug}`}
            className="flex gap-2 items-center justify-center flex-grow border-b border-brand-secondary px-4 py-2 font-semibold ">
            <Info size={18} />
            <span>Detail</span>
          </Link>
        </Button>
        <DeleteDialog id={wish.id} action={deleteWishlistAction} />
      </div>
    </div>
  );
};

export default WishlistCard;
