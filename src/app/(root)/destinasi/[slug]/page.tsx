import Spinner from "@/components/Spinner";
import { getDestinationBySlug } from "@/lib/actions/destinationActions";
import { auth } from "@/lib/auth";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AddToWhisListButton from "./AddToWishlistButton";
import DestinationDetails from "./DestinationDetails";

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
          <AddToWhisListButton
            userId={session?.user.id}
            destinationSlug={destination.slug}
          />
        )}
      </div>

      <Suspense fallback={<Spinner />}>
        <DestinationDetails destination={destination} />
      </Suspense>
    </div>
  );
};

export default Page;
