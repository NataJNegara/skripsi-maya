import DeleteDialog from "@/components/shared/DeleteDialog";
import { Button } from "@/components/ui/button";
import { deleteDestinationById } from "@/lib/actions/destinationActions";
import { cn, formatDateTime, textShorter } from "@/lib/utils";
import { Destination } from "@/types";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminWisataCard = ({ destination }: { destination: Destination }) => {
  return (
    <div className="border border-brand-secondary grid md:grid-cols-[1fr_auto]">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full md:w-[150px] h-42 md:h-32">
          <Image
            src={destination.bannerImg}
            alt="contoh gambar"
            quality={50}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-2 flex flex-col gap-2 w-full">
          <div>
            <Link
              href={`/destinasi/${destination.slug}`}
              className="font-semibold capitalize">
              {destination.title}
            </Link>
            <p className="text-sm">{textShorter(destination.preview)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "capitalize text-sm px-4 rounded-full",
                destination.tag === "ALAM"
                  ? "bg-gray-800 text-gray-50"
                  : destination.tag === "BUDAYA"
                  ? "bg-yellow-500 text-yellow-50"
                  : "bg-brand-accent text-brand-white-alt"
              )}>
              {destination.tag.toLocaleLowerCase()}
            </p>
            <p className="text-xs px-4 italic text-gray-500">
              {formatDateTime(destination.createdAt).dateTime}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-t md:border-t-0 md:border-l border-brand-secondary w-full md:w-[100px]">
        <Button
          asChild
          className="rounded-none bg-transparent hover:bg-yellow-500 text-brand hover:text-brand-white-alt">
          <Link
            href={`/admin/wisata/update/${destination.slug}`}
            className="flex gap-2 items-center justify-center flex-grow border-b border-brand-secondary px-4 py-2 font-semibold ">
            <SquarePen size={16} />
            <span>Ubah</span>
          </Link>
        </Button>

        <DeleteDialog id={destination.id} action={deleteDestinationById} />
      </div>
    </div>
  );
};

export default AdminWisataCard;
