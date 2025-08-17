import { Badge } from "@/components/ui/badge";
import { cn, textShorter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type DestinationProp = {
  destination: {
    title: string;
    slug: string;
    tag: string;
    preview: string;
    mainImg: string;
  };
};

const Destination = ({ destination }: DestinationProp) => {
  let wisataType;
  if (destination.tag === "alam") {
    wisataType = "bg-brand text-brand-white";
  } else if (destination.tag === "buatan") {
    wisataType = "bg-brand-white text-brand";
  } else {
    wisataType = "bg-brand-accent text-brand-white";
  }

  return (
    <Link
      href={`/destinasi/${destination.slug}`}
      className="relative aspect-video overflow-hidden">
      <Image
        src={destination.mainImg}
        alt={`image of ${destination.title}`}
        fill
        className="object-cover hover:scale-110 hover:brightness-75 transition-all duration-500"
      />
      <div className="absolute bottom-0 p-4">
        <Badge className={cn("bg-brand capitalize ", wisataType)}>
          {destination.tag}
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
