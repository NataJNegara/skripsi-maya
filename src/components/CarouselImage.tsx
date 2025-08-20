import { cn } from "@/lib/utils";
import Image from "next/image";

type CarouselImageProp = {
  imgSrc: string;
  imgAlt: string;
};

const CarouselImage = ({ imgSrc, imgAlt }: CarouselImageProp) => {
  return (
    <div className={cn("relative h-[400px] 2xl:h-[500px]")}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="h-full w-full object-cover rounded-xl"
        fill
      />
    </div>
  );
};

export default CarouselImage;
