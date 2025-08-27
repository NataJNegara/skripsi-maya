import DeleteDialog from "@/components/shared/DeleteDialog";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/lib/actions/postActions";
import { cn, formatDateTime, textShorter } from "@/lib/utils";
import { Post } from "@/types";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminPostCard = ({ post }: { post: Post }) => {
  const category = post.category.toLowerCase();

  return (
    <div className="border border-brand-secondary grid md:grid-cols-[1fr_auto]">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative w-full md:w-[150px] h-42 md:h-32">
          <Image
            src={post.banner}
            alt="contoh gambar"
            quality={50}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-2 flex flex-col gap-2 w-full">
          <div>
            <Link
              href={`/${category}/${post.slug}`}
              className="font-semibold capitalize">
              {post.title}
            </Link>
            <p className="text-sm">{textShorter(post.preview)}</p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <p
              className={cn(
                "capitalize text-sm px-4 rounded-full",
                post.category === "EVENT"
                  ? "bg-yellow-500 text-yellow-50"
                  : "bg-gray-800 text-gray-50"
              )}>
              {post.category.toLocaleLowerCase()}
            </p>
            <p className="text-xs px-4 italic text-gray-500">
              {formatDateTime(post.createdAt).dateTime}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-t md:border-t-0 md:border-l border-brand-secondary w-full md:w-[100px]">
        <Button
          asChild
          className="rounded-none bg-transparent hover:bg-yellow-500 text-brand hover:text-brand-white-alt">
          <Link
            href={`/admin/postingan/update/${post.slug}`}
            className="flex gap-2 items-center justify-center flex-grow border-b border-brand-secondary px-4 py-2 font-semibold ">
            <SquarePen size={16} />
            <span>Ubah</span>
          </Link>
        </Button>

        <DeleteDialog id={post.id} action={deletePostAction} />
      </div>
    </div>
  );
};

export default AdminPostCard;
