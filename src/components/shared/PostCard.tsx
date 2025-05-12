import Image from "next/image";

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
      <div className="relative w-full h-40 xl:h-60 2xl:h-72 rounded-2xl overflow-hidden mb-4">
        <Image
          src={props.post.bgImage}
          fill
          alt={`image of ${props.post.title}`}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{props.post.title}</p>
        <p>{props.post.preview}</p>
        <p className="text-sm text-gray-400">{props.post.date}</p>
      </div>
    </div>
  );
};

export default PostCard;
