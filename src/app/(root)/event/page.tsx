import { Suspense } from "react";
import EventList from "./EventList";
import Spinner from "@/components/Spinner";

const Page = () => {
  return (
    <section className="page-container">
      <div className="text-center flex flex-col gap-8 items-center justify-center">
        <p className="page-title">Event</p>
        <div className="margin-bottom">
          <p className="text-xl font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            ullam obcaecati ut molestias. Ratione impedit accusantium veritatis
            dolorum aut vitae et ullam quae, excepturi accusamus quisquam
            perferendis cumque! Dolores, officiis.
          </p>
        </div>
      </div>

      <Suspense fallback={<Spinner />}>
        <EventList />
      </Suspense>
    </section>
  );
};

export default Page;
