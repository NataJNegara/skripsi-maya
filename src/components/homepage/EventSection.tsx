import { getEvents } from "@/lib/actions/postActions";
import Link from "next/link";
import PostCard from "../shared/PostCard";

const EventSection = async () => {
  const events = await getEvents();
  const displayedEvents = events.slice(0, 3);

  return (
    <section className="section">
      <div className="flex flex-col gap-8 mb-16">
        <h2 className="text-5xl xl:text-7xl font-caveat capitalize">event</h2>
        <p className="md:w-3xl md:text-lg">
          Muara Enim selalu hidup dengan beragam acara menarik. Dari festival
          budaya, pertunjukan seni, hingga kegiatan komunitas, setiap event
          adalah cermin kehangatan dan kekayaan Serasan Sekundang.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-center items-center 2xl:px-16 mb-16">
        {displayedEvents.map((event) => (
          <PostCard post={event} key={event.title} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/event" className="w-fit button-brand py-4 px-8">
          Lihat Semua
        </Link>
      </div>
    </section>
  );
};

export default EventSection;
