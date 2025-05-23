import Image from "next/image";
import Link from "next/link";

type EventCardProp = {
  event: {
    title: string;
    preview: string;
    href: string;
    bgImage: string;
    date: string;
  };
};

const EventCard = (props: EventCardProp) => {
  return (
    <div key={props.event.title}>
      <Link href={`/events/${props.event.href}`}>
        <div className="relative w-full h-52 xl:h-60 2xl:h-72 overflow-hidden mb-4">
          <Image
            src={props.event.bgImage}
            fill
            alt={`image of ${props.event.title}`}
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-4">
        <Link href={`/events/${props.event.href}`}>
          <p className="text-xl font-semibold">{props.event.title}</p>
        </Link>
        <p>{props.event.preview}</p>
        <p className="text-sm text-gray-400">{props.event.date}</p>
      </div>
    </div>
  );
};

export default EventCard;
