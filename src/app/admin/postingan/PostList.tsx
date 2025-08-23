import { Post } from "@/types";
import AdminPostCard from "./AdminPostCard";

const PostList = async ({ posts }: { posts: Post[] }) => {
  if (!posts)
    return <p className="text-sm italic text-center">belum ada postingan.</p>;

  return (
    <div className="flex flex-col gap-2 mb-10">
      {posts.map((post) => (
        <AdminPostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
