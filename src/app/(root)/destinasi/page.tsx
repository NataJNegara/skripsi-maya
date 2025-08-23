import Filter from "@/components/shared/Filter";
import DestinationList from "./DestinationList";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ tag: string }>;
}) => {
  const { tag = "SEMUA" } = await searchParams;

  return (
    <div className="page-container">
      <div className="w-fit mx-auto flex flex-col justify-center mb-8">
        <p className="page-title">Destinasi</p>
        <p className="page-title pl-32">Wisata</p>
      </div>
      <p className="text-center text-brand text-sm md:text-base">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
        praesentium id, temporibus laboriosam deleniti culpa soluta laborum. Qui
        autem illum facilis veniam obcaecati, ullam magnam repudiandae.
        Provident, sed rerum tempora ipsam fugit facere, explicabo voluptas
        maiores numquam exercitationem nihil officia culpa atque voluptate porro
        blanditiis. Expedita eos dolore iste quidem facere voluptatum libero
        minima quibusdam cumque autem eum fuga natus, possimus eaque neque est,
        ratione similique tempora error, eligendi animi dolor! Et aspernatur
        dignissimos hic ipsum officia fugit esse odio.
      </p>

      <div className="flex justify-center my-16">
        <Filter
          filterField="tag"
          options={[
            { label: "Semua", value: "SEMUA" },
            { label: "Alam", value: "ALAM" },
            { label: "Buatan", value: "BUATAN" },
            { label: "Budaya", value: "BUDAYA" },
          ]}
        />
      </div>

      <Suspense fallback={<Spinner />}>
        <DestinationList filterTag={tag} />
      </Suspense>
    </div>
  );
};

export default Page;
