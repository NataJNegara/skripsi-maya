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
import { BookmarkPlus, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("@/components/MyMap"), {
  ssr: false,
});

const DestinationDetails = ({ destination }: { destination: Destination }) => {
  return (
    <div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-[4fr_1fr]">
        <div className="flex flex-col gap-6 md:gap-10">
          <p className="content-title">{destination.title}</p>
          <div className="flex items-center gap-2">
            <MapPin className="text-brand-accent" />
            <p className="font-semibold text-brand-accent text-xs md:text-sm">
              {destination.location}
            </p>
          </div>
          <p className="xl:text-lg">{destination.preview}</p>
        </div>
        <div className="md:ml-auto">
          <button className="w-full md:w-fit flex justify-center items-center gap-2 py-3 px-6 bg-brand-accent hover:bg-brand transition-all duration-300 cursor-pointer font-semibold text-sm 2xl:text-lg text-brand-white-alt whitespace-nowrap">
            <BookmarkPlus className="w-5 h-5 2xl:w-8 2xl:h-8" />
            Simpan ke Whislist
          </button>
        </div>
      </div>

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
          <p className="xl:text-lg">{destination.content}</p>
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

      {/* comment section */}
      <div className="">COMMENT SECTION</div>
      {/* end of comment section */}
    </div>
  );
};

export default DestinationDetails;
