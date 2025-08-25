import DeleteDialog from "@/components/shared/DeleteDialog";
import { deleteDestinationById } from "@/lib/actions/destinationActions";
import { cn, formatDateTime, textShorter } from "@/lib/utils";
import { Destination } from "@/types";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminWisataCard = ({ destination }: { destination: Destination }) => {
  return (
    <div className="border grid grid-cols-[1fr_auto]">
      <div className="flex gap-2">
        <div className="relative w-[150px] h-[100px]">
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
            <p className="text-base ">{textShorter(destination.preview)}</p>
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
      <div className="w-fit border-l">
        <Link
          href={`/admin/wisata/update/${destination.slug}`}
          className="flex items-center gap-2 w-full h-1/2 px-3 hover:bg-yellow-500 hover:text-yellow-50 text-sm font-semibold transition-all duration-300">
          <SquarePen size={16} />
          <span>Ubah</span>
        </Link>

        <DeleteDialog id={destination.id} action={deleteDestinationById} />
      </div>
    </div>
  );
};

export default AdminWisataCard;
