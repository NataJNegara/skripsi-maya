import { getEvents } from "@/lib/actions/postActions";
import Link from "next/link";
import PostCard from "../shared/PostCard";

const EventSection = async () => {
  const events = await getEvents();
  const displayedEvents = events.slice(0, 3);

  return (
    <section className="section">
      <div className="2xl:w-1/2 mb-16">
        <h2 className="text-5xl xl:text-7xl font-caveat">Acara</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
          excepturi consequuntur reprehenderit quasi earum magnam asperiores
          nemo libero adipisci. Fugiat quod eius ullam quibusdam reiciendis!
          Eius quasi ad iste tenetur? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Doloribus quasi dignissimos alias et iure.
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
