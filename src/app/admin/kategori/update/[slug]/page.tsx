import { getCategoryBySlug } from "@/lib/actions/categoryActions";
import { notFound } from "next/navigation";
import UpdateCategoryForm from "./UpdateCategoryForm";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return notFound();

  return (
    <div className="">
      <p className="dashboard-title mb-16">Update Kategori</p>
      <UpdateCategoryForm category={category} />
    </div>
  );
};

export default Page;
