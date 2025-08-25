import Spinner from "@/components/Spinner";
import Filter from "@/components/shared/Filter";
import { Suspense } from "react";
import WishlistList from "./WishlistList";

type PostPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
};

const Page = async ({ searchParams }: PostPageProps) => {
  const { page = "1", category = "SEMUA" } = await searchParams;

  return (
    <div className="">
      <div className="mb-12">
        <p className="dashboard-title">Wishlist saya</p>
      </div>

      {/* filter */}
      <div className="mb-8">
        <Filter
          filterField="category"
          options={[
            { label: "Semua", value: "SEMUA" },
            { label: "Alam", value: "ALAM" },
            { label: "Budaya", value: "BUDAYA" },
            { label: "Buatan", value: "BUATAN" },
          ]}
        />
      </div>

      {/* table of content */}
      <Suspense fallback={<Spinner />}>
        <WishlistList page={page} category={category} />
      </Suspense>
    </div>
  );
};

export default Page;
