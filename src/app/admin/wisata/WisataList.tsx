import Pagination from "@/components/shared/Pagination";
import AdminWisataCard from "./AdminWisataCard";
import { getDestinationsAdmin } from "@/lib/actions/destinationActions";

type WisataListProps = {
  page: string;
  categoryId: string;
  searchQuery: string;
};

const WisataList = async ({
  page,
  categoryId,
  searchQuery,
}: WisataListProps) => {
  const { destinations, totalData, pageCount } = await getDestinationsAdmin({
    page: Number(page),
    searchQuery,
    categoryId,
  });

  if (!destinations)
    return <p className="text-sm italic text-center">belum ada postingan.</p>;

  return (
    <>
      <p className="text-sm italic my-8">
        menampilkan {destinations.length} dari {totalData} postingan.
      </p>

      <div className="flex flex-col gap-4 mb-10">
        {destinations.map((destination) => (
          <AdminWisataCard destination={destination} key={destination.id} />
        ))}
      </div>

      {pageCount > 1 && <Pagination page={page} totalPages={pageCount} />}
    </>
  );
};

export default WisataList;
