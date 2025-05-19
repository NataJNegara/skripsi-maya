import Link from "next/link";
import { blogsData } from "@/db/data-service";
import PostCard from "../shared/PostCard";

const displayedPosts = blogsData.slice(0, 3);

const BlogSection = () => {
  return (
    <section className="section">
      <div className="2xl:w-1/2 mb-16">
        <h2>Blog</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
          excepturi consequuntur reprehenderit quasi earum magnam asperiores
          nemo libero adipisci. Fugiat quod eius ullam quibusdam reiciendis!
          Eius quasi ad iste tenetur? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Doloribus quasi dignissimos alias et iure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-center items-center 2xl:px-16 mb-16">
        {displayedPosts.map((post) => (
          <PostCard post={post} key={post.title} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/events" className="w-fit button-brand py-4 px-8">
          Lihat Semua
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
