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
      <p className="text-center text-brand text-sm md:text-lg">
        Muara Enim menawarkan pesona wisata alam memukau, dari air terjun jernih
        hingga perbukitan hijau yang menenangkan. Wisata buatan menghadirkan
        taman rekreasi dan spot kekinian untuk bersantai. Budaya khas, seni
        tradisi, serta kuliner lokal menambah kehangatan, membuat kunjungan tak
        terlupakan.
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
