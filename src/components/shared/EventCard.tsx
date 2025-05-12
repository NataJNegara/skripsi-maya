import Image from "next/image";

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
      <div className="relative w-full h-40 xl:h-60 2xl:h-72 rounded-2xl overflow-hidden mb-4">
        <Image
          src={props.event.bgImage}
          fill
          alt={`image of ${props.event.title}`}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{props.event.title}</p>
        <p>{props.event.preview}</p>
        <p className="text-sm text-gray-400">{props.event.date}</p>
      </div>
    </div>
  );
};

export default EventCard;
