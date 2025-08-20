import { getDestinationBySlug } from "@/lib/actions/destinationActions";
import { notFound } from "next/navigation";
import DestinationDetails from "./DestinationDetails";

type DestinationDetailProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: DestinationDetailProps) => {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  // console.log(destination);

  if (!destination) return notFound();

  return (
    <div className="page-container">
      <DestinationDetails destination={destination} />
    </div>
  );
};

export default Page;
