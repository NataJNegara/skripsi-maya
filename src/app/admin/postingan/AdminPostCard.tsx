import DeleteDialog from "@/components/shared/DeleteDialog";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/lib/actions/postActions";
import { cn, formatDateTime } from "@/lib/utils";
import { Post } from "@/types";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminPostCard = ({ post }: { post: Post }) => {
  const category = post.category.toLowerCase();

  return (
    <div className="border grid grid-cols-[1fr_auto]">
      <div className="flex gap-2">
        <div className="relative w-[150px] h-[100px]">
          <Image
            src={post.banner}
            alt="contoh gambar"
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
            <p className="text-base ">{post.preview}</p>
          </div>
          <div className="flex items-center justify-between">
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
      <div className="w-fit border-l">
        <Button className="flex items-center gap-2 w-full h-1/2 bg-transparent hover:bg-gray-200 text-gray-800 cursor-pointer transition-all duration-300">
          <SquarePen />
          <span>Ubah</span>
        </Button>

        <DeleteDialog id={post.id} action={deletePostAction} />
      </div>
    </div>
  );
};

export default AdminPostCard;
