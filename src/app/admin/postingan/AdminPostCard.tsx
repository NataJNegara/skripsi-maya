import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type AdminPostCardProps = {
  post: {
    category: string;
    title: string;
    slug: string;
    banner: string;
    preview: string;
    content: string;
  };
};

const AdminPostCard = ({ post }: AdminPostCardProps) => {
  return (
    <div className="border grid grid-cols-[1fr_auto]">
      <div className="flex gap-2">
        <Image src={post.banner} alt="contoh gambar" width={150} height={100} />
        <div className="p-2 flex flex-col gap-2 w-full">
          <div>
            <Link href={`/blogs/${post.slug}`} className="font-semibold">
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
            <p className="text-xs px-4 italic text-gray-500">tanggal</p>
          </div>
        </div>
      </div>
      <div className="w-fit border-l">
        <Button className="w-full h-1/2 bg-transparent hover:bg-gray-200 text-gray-800 cursor-pointer transition-all duration-300">
          Ubah
        </Button>
        <Button className="w-full h-1/2 bg-transparent hover:bg-red-500 text-gray-800 hover:text-red-50 cursor-pointer transition-all duration-300">
          Hapus
        </Button>
      </div>
    </div>
  );
};

export default AdminPostCard;
