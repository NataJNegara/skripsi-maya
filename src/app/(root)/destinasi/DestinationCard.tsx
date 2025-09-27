import { Badge } from "@/components/ui/badge";
import { cn, textShorter } from "@/lib/utils";
import { Destination as DestinationType } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Destination = ({ destination }: { destination: DestinationType }) => {
  return (
    <Link
      href={`/destinasi/${destination.slug}`}
      className="relative aspect-video overflow-hidden">
      <Image
        src={destination.bannerImg}
        alt={`image of ${destination.title}`}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover hover:scale-110 hover:brightness-75 transition-all duration-500"
      />
      <div className="absolute bottom-0 p-4">
        <Badge className={cn("bg-brand-secondary capitalize mb-2")}>
          {destination.category.name}
        </Badge>
        <div className="text-brand-white">
          <p className="text-lg xl:text-2xl font-semibold capitalize">
            {destination.title}
          </p>
          <p className="text-xs md:text-sm">
            {textShorter(destination.preview)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Destination;
