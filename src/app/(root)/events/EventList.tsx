import PostCard from "@/components/shared/PostCard";
import { getEvents } from "@/lib/actions/postActions";

const EventList = async () => {
  const events = await getEvents();

  if (!events.length)
    return (
      <p className="italic text-center text-gray-400">
        Tidak ada event yang tersedia.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {events.map((data) => (
        <PostCard post={data} key={data.id} />
      ))}
    </div>
  );
};

export default EventList;
