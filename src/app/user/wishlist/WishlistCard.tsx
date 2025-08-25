import DeleteDialog from "@/components/shared/DeleteDialog";
import { Badge } from "@/components/ui/badge";
import { deleteWishlistAction } from "@/lib/actions/wishlistActions";
import { cn, formatDateTime } from "@/lib/utils";
import { Wishlist } from "@/types";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WishlistCard = ({ wish }: { wish: Wishlist }) => {
  return (
    <div className="flex border border-brand-secondary" key={wish.id}>
      <div className="relative h-32 aspect-square">
        <Image
          src={wish.destination.bannerImg}
          alt={`image of ${wish.destination.title}`}
          fill
          className="object-cover border-r border-brand-secondary"
        />
      </div>

      <div className="flex flex-col flex-grow px-6 py-3">
        <p className="text-lg font-semibold capitalize">
          {wish.destination.title}
        </p>
        <p>{wish.destination.preview}</p>
        <div className="flex items-center mt-auto">
          <Badge
            className={cn(
              "capitalize text-xs px-4 rounded-full",
              wish.destination.tag === "ALAM"
                ? "bg-brand text-brand-white-alt"
                : wish.destination.tag === "BUDAYA"
                ? "bg-brand-secondary text-brand-white-alt"
                : "bg-brand-accent text-brand-white-alt"
            )}>
            {wish.destination.tag.toLocaleLowerCase()}
          </Badge>
          <p className="ml-auto text-sm text-gray-400">
            {formatDateTime(wish.createdAt).dateOnly}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-brand-secondary w-[100px]">
        <Link
          href={`/destinasi/${wish.destination.slug}`}
          className="flex gap-2 items-center flex-grow border-b border-brand-secondary px-4 py-2 text-brand font-semibold hover:bg-brand-secondary hover:text-brand-white-alt">
          <Info />
          <span>Detail</span>
        </Link>
        {/* <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
          className="flex gap-2 items-center flex-grow cursor-pointer ">
          <Trash />
          <span>Hapus</span>
        </Button> */}
        <DeleteDialog id={wish.id} action={deleteWishlistAction} />
      </div>
    </div>
  );
};

export default WishlistCard;
