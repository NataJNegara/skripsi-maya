import { getPosts } from "@/lib/actions/postActions";
import AdminPostCard from "./AdminPostCard";
import Pagination from "@/components/shared/Pagination";

type PostListProps = {
  page: string;
  category: string;
  searchQuery: string;
};

const PostList = async ({ page, category, searchQuery }: PostListProps) => {
  const { posts, totalData, pageCount } = await getPosts({
    page: Number(page),
    category,
    searchQuery,
  });

  if (!posts)
    return <p className="text-sm italic text-center">belum ada postingan.</p>;

  return (
    <>
      <p className="text-sm italic my-8">
        menampilkan {posts.length} dari {totalData} postingan.
      </p>

      <div className="flex flex-col gap-4 mb-10">
        {posts.map((post) => (
          <AdminPostCard post={post} key={post.id} />
        ))}
      </div>

      {pageCount > 1 && <Pagination page={page} totalPages={pageCount} />}
    </>
  );
};

export default PostList;
