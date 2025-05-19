import Image from "next/image";
import Link from "next/link";

type PostCardProp = {
  post: {
    title: string;
    preview: string;
    href: string;
    bgImage: string;
    date: string;
  };
};

const PostCard = (props: PostCardProp) => {
  return (
    <div key={props.post.title}>
      <Link href={`/blogs/${props.post.href}`}>
        <div className="relative w-full h-60 sm:h-72 overflow-hidden mb-4">
          <Image
            src={props.post.bgImage}
            fill
            alt={`image of ${props.post.title}`}
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-4">
        <Link
          href={`/blogs/${props.post.href}`}
          className="text-xl font-semibold">
          {props.post.title}
        </Link>
        <p>{props.post.preview}</p>
        <p className="text-sm text-gray-400">{props.post.date}</p>
      </div>
    </div>
  );
};

export default PostCard;
