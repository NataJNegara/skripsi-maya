import DeleteDialog from "@/components/shared/DeleteDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteCategoryAction } from "@/lib/actions/categoryActions";
import { textShorter } from "@/lib/utils";
import { CategoryWithDestination } from "@/types";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminKategoriCard = ({
  category,
}: {
  category: CategoryWithDestination;
}) => {
  return (
    <div className="border border-brand-secondary grid md:grid-cols-[1fr_auto]">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full md:w-[150px] h-42 md:h-32">
          <Image
            src={category.bannerImg}
            alt="contoh gambar"
            quality={50}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-2 flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2">
            <Link
              href={`/destinasi?category=${category.slug}`}
              className="font-semibold capitalize">
              {category.name}
            </Link>
            <p className="text-sm">{category.tagline}</p>
            <p className="text-sm">{textShorter(category.description)}</p>
          </div>
          <div className="mt-auto">
            <Badge className="bg-brand-secondary!">
              Total Destinasi: {category.Destination?.length}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-t md:border-t-0 md:border-l border-brand-secondary w-full md:w-[100px]">
        <Button
          asChild
          className="rounded-none bg-transparent hover:bg-yellow-500 text-brand hover:text-brand-white-alt">
          <Link
            href={`/admin/kategori/update/${category.slug}`}
            className="flex gap-2 items-center justify-center flex-grow border-b border-brand-secondary px-4 py-2 font-semibold ">
            <SquarePen size={16} />
            <span>Ubah</span>
          </Link>
        </Button>

        <DeleteDialog id={category.id} action={deleteCategoryAction} />
      </div>
    </div>
  );
};

export default AdminKategoriCard;
