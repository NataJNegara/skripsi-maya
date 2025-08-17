import { destinasiData } from "@/db/data-service";
import { notFound } from "next/navigation";
import DestinationDetails from "./DestinationDetails";

type DestinationDetailProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: DestinationDetailProps) => {
  const { slug } = await params;
  const destination = destinasiData.find((data) => data.slug === slug);
  // console.log(destination);

  if (!destination) return notFound();

  return (
    <div className="page-container">
      <DestinationDetails destination={destination} />
    </div>
  );
};

export default Page;
