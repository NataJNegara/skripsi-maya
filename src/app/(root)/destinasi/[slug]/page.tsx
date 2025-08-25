import { getDestinationBySlug } from "@/lib/actions/destinationActions";
import { notFound } from "next/navigation";
import DestinationDetails from "./DestinationDetails";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { BookmarkPlus, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";

type DestinationDetailProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: DestinationDetailProps) => {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  const session = await auth();

  if (!destination) return notFound();

  return (
    <div className="page-container">
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
        {session?.user.role !== "ADMIN" && (
          <div className="md:ml-auto">
            <button className="w-full md:w-fit flex justify-center items-center gap-2 py-3 px-6 bg-brand-accent hover:bg-brand transition-all duration-300 cursor-pointer font-semibold text-sm 2xl:text-lg text-brand-white-alt whitespace-nowrap">
              <BookmarkPlus className="w-5 h-5 2xl:w-8 2xl:h-8" />
              Simpan ke Whislist
            </button>
          </div>
        )}
      </div>

      <Suspense fallback={<Spinner />}>
        <DestinationDetails destination={destination} />
      </Suspense>
    </div>
  );
};

export default Page;
