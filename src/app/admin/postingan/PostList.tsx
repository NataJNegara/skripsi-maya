import { getPosts } from "@/lib/actions/postActions";
import AdminPostCard from "./AdminPostCard";

const PostList = async () => {
  const posts = await getPosts();

  if (!posts)
    return <p className="text-sm italic text-center">belum ada postingan.</p>;

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <AdminPostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
