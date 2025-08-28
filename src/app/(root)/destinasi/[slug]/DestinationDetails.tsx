"use client";

import CarouselImage from "@/components/CarouselImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Coordinate, Destination } from "@/types";
import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("@/components/MyMap"), {
  ssr: false,
});

const DestinationDetails = ({ destination }: { destination: Destination }) => {
  return (
    <>
      <div className="relative margin-horizontal pb-8">
        <Carousel>
          <CarouselContent className="w-full">
            {destination.destinationImages.map((item) => (
              <CarouselItem
                key={item}
                className="w-full max-w-screen xl:max-w-3xl 2xl:max-w-5xl">
                <CarouselImage imgAlt={item} imgSrc={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-[48px] right-[62px]">
            <CarouselPrevious className="bg-brand-accent! border-brand-accent! text-brand-white-alt! hover:bg-brand-secondary!" />
          </div>
          <div className="absolute top-[48px] right-[82px]">
            <CarouselNext className="bg-brand-accent! border-brand-accent! text-brand-white-alt! hover:bg-brand-secondary!" />
          </div>
        </Carousel>
      </div>

      {/* content */}
      <div className="margin-horizontal">
        <div>
          <p className="text-xl font-semibold mb-8">Deskripsi</p>
          <div
            dangerouslySetInnerHTML={{
              __html: destination.content as TrustedHTML,
            }}
          />
        </div>
        {/* end of content */}
      </div>

      {/* map */}
      <div className="margin-horizontal">
        <p className="text-xl font-semibold mb-8">Lokasi</p>
        <div className="border-1 border-brand-accent!">
          <MyMap coordinate={destination.coordinate as Coordinate} />
        </div>
      </div>
      {/* end of map */}
    </>
  );
};

export default DestinationDetails;
