import { getBeritas } from "@/lib/actions/postActions";
import Link from "next/link";
import PostCard from "../shared/PostCard";

const BlogSection = async () => {
  const blogs = await getBeritas();
  const displayedBlogs = blogs.slice(0, 3);

  return (
    <section className="section">
      <div className="flex flex-col gap-8 mb-16">
        <h2 className="text-5xl xl:text-7xl font-caveat capitalize">Blog</h2>
        <p className="md:w-3xl md:text-lg">
          Temukan cerita-cerita seru tentang perjalanan dan kehidupan di Muara
          Enim. Blog ini hadir untuk menginspirasi, memberi informasi, dan
          menemani setiap langkah wisatamu.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-center items-center 2xl:px-16 mb-16">
        {displayedBlogs.map((post) => (
          <PostCard post={post} key={post.title} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/berita" className="w-fit button-brand py-4 px-8">
          Lihat Semua
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
