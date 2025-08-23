import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdatePostForm from "./UpdatePostForm";
import { getPostBySlug } from "@/lib/actions/postActions";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <div className="">
      <p className="dashboard-title mb-16">Perbarui postingan</p>
      <Link
        href="/admin/postingan"
        className="flex gap-2 items-center px-4 py-2 bg-brand hover:bg-brand-secondary text-brand-white-alt w-fit transition-all duration-300">
        <ArrowLeft size={20} />
        <span>Kembali</span>
      </Link>

      <div className="my-16">
        <UpdatePostForm post={post} />
      </div>
    </div>
  );
};

export default Page;
