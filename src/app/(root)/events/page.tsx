import EventCard from "@/components/shared/EventCard";
import { eventsData } from "@/db/data-service";

const Page = () => {
  return (
    <section className="page-container">
      <div className="text-center flex flex-col gap-8 items-center justify-center mb-32">
        <p>EVENT</p>
        <div className="">
          <h2 className="capitalize">Title Text Here</h2>
          <p className="text-2xl font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            ullam obcaecati ut molestias. Ratione impedit accusantium veritatis
            dolorum aut vitae et ullam quae, excepturi accusamus quisquam
            perferendis cumque! Dolores, officiis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {eventsData.map((event) => (
          <EventCard event={event} key={event.title} />
        ))}
      </div>
    </section>
  );
};

export default Page;
