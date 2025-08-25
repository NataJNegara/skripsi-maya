import { getDestinationBySlug } from "@/lib/actions/destinationActions";
import { notFound } from "next/navigation";
import UpdateWisataForm from "./UpdateWisataForm";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) return notFound();

  return (
    <div className="">
      <p className="dashboard-title mb-16">Perbarui postingan</p>
      <UpdateWisataForm destination={destination} />
    </div>
  );
};

export default Page;
