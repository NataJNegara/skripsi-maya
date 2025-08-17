import Destination from "./Destination";
import { destinasiData } from "@/db/data-service";

const DestinationList = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
      {destinasiData.map((destinasi) => (
        <Destination destination={destinasi} key={destinasi.slug} />
      ))}
    </div>
  );
};

export default DestinationList;
