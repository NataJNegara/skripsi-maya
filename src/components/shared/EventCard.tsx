import Image from "next/image";
import Link from "next/link";

type EventCardProp = {
  event: {
    title: string;
    preview: string;
    slug: string;
    banner: string;
    createdAt: Date;
  };
};

const EventCard = (props: EventCardProp) => {
  return (
    <div key={props.event.title}>
      <Link href={`/events/${props.event.slug}`}>
        <div className="relative w-full h-52 xl:h-60 2xl:h-72 overflow-hidden mb-4">
          <Image
            src={props.event.banner}
            fill
            alt={`image of ${props.event.title}`}
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-4">
        <Link href={`/events/${props.event.slug}`}>
          <p className="text-xl font-semibold">{props.event.title}</p>
        </Link>
        <p>{props.event.preview}</p>
        <p className="text-sm text-gray-400">tanggal</p>
      </div>
    </div>
  );
};

export default EventCard;
