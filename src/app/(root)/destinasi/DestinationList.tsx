import { getDestinations } from "@/lib/actions/destinationActions";
import Destination from "./DestinationCard";

const DestinationList = async () => {
  const destinations = await getDestinations();

  if (!destinations) return <p>Belum ada destinasi</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
      {destinations.map((destination) => (
        <Destination destination={destination} key={destination.slug} />
      ))}
    </div>
  );
};

export default DestinationList;
