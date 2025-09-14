import { Suspense } from "react";
import EventList from "./EventList";
import Spinner from "@/components/Spinner";

const Page = () => {
  return (
    <section className="page-container">
      <div className="text-center flex flex-col gap-8 items-center justify-center">
        <p className="page-title">Event</p>
        <div className="margin-bottom">
          <p className="md:text-xl">
            Setiap kegiatan punya cerita. Lihat daftar acara yang menggambarkan
            semangat, seni, dan kehidupan masyarakat Muara Enim.
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
