import { getDestinations } from "@/lib/actions/destinationActions";
import Destination from "./DestinationCard";

const DestinationList = async ({
  categorySlug,
  districtId,
}: {
  categorySlug: string;
  districtId: string;
}) => {
  const destinations = await getDestinations({ categorySlug, districtId });

  if (destinations === null || destinations.length === 0)
    return (
      <p className="text-center italic font-semibold text-brand/50">
        Belum ada destinasi
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
      {destinations.map((destination) => (
        <Destination destination={destination} key={destination.slug} />
      ))}
    </div>
  );
};

export default DestinationList;
