import { textShorter } from "@/lib/utils";
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
    <div key={props.post.title}>
      <Link href={`/${category}/${props.post.slug}`}>
        <div className="relative w-full h-60 sm:h-72 overflow-hidden mb-4">
          <Image
            src={props.post.banner}
            fill
            alt={`image of ${props.post.title}`}
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2 md:gap-4">
        <Link
          href={`/${category}/${props.post.slug}`}
          className="text-xl font-semibold">
          {props.post.title}
        </Link>
        <p className="text-sm">{textShorter(props.post.preview)}</p>
        <p className="text-xs text-gray-400">tanggal</p>
      </div>
    </div>
  );
};

export default PostCard;
