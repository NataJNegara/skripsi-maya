import { formatDateTime, textShorter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type PostCardProp = {
  post: {
    title: string;
    slug: string;
    banner: string;
    category: string;
    preview: string;
    createdAt: Date;
  };
};

const PostCard = (props: PostCardProp) => {
  const category = `${props.post.category.toLowerCase()}`;

  return (
    <div className="mb-auto">
      <Link href={`/${category}/${props.post.slug}`} className="">
        <div className="relative w-full h-52 xl:h-60 2xl:h-72 overflow-hidden mb-4">
          <Image
            src={props.post.banner}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`image of ${props.post.title}`}
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-col  gap-4">
        <Link
          href={`/${category}/${props.post.slug}`}
          className="text-lg  2xl:text-xl font-semibold">
          {props.post.title}
        </Link>
        <p className="text-sm">{textShorter(props.post.preview)}</p>
        <p className="text-xs text-gray-400">
          {formatDateTime(props.post.createdAt).dateOnly}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
