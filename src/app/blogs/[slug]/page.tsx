import { blogsData } from "@/db/data-service";
import Image from "next/image";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = blogsData.find((post) => post.href === slug);

  console.log(post);

  return (
    <section className="page-container">
      <div className="text-center mb-16">
        <h2>{post?.title}</h2>
        <p className="text-xs sm:text-sm font-semibold text-brand-secondary">
          {post?.date}
        </p>
      </div>
      <div className="relative w-full h-[500px] mb-16">
        <Image
          src={post!.bgImage}
          alt={`gambar untuk postingan ${post?.title}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="">
        <p className="mb-4">{post?.preview}</p>
        <p>{post?.body}</p>
      </div>
    </section>
  );
};

export default Page;
