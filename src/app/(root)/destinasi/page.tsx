import FilterDistrict from "@/components/FilterDistrict";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import DestinationList from "./DestinationList";
import FilterCategory from "@/components/FilterCategory";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; districtId: string }>;
}) => {
  const { category = "all", districtId = "all" } = await searchParams;

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

      <div className="flex justify-center gap-6 my-16">
        <FilterCategory />
        <FilterDistrict />
      </div>

      <Suspense fallback={<Spinner />}>
        <DestinationList categorySlug={category} districtId={districtId} />
      </Suspense>
    </div>
  );
};

export default Page;
