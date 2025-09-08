import Spinner from "@/components/Spinner";
import { getDestinationBySlug } from "@/lib/actions/destinationActions";
import { auth } from "@/lib/auth";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AddToWhisListButton from "./AddToWishlistButton";
import DestinationDetails from "./DestinationDetails";
import { getMyWishlistAction } from "@/lib/actions/wishlistActions";
import CommentList from "./CommentList";

type DestinationDetailProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: DestinationDetailProps) => {
  const { slug } = await params;
  const session = await auth();

  const [destination, { wishlist }] = await Promise.all([
    getDestinationBySlug(slug),
    getMyWishlistAction({}),
  ]);

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
            wishlist={wishlist}
          />
        )}
      </div>

      <Suspense fallback={<Spinner />}>
        <DestinationDetails destination={destination} />
      </Suspense>

      <div className="pt-16">
        <CommentList
          userId={session?.user.id}
          destinationId={destination.id}
          slug={slug}
          userRole={session?.user.role}
        />
      </div>
    </div>
  );
};

export default Page;
