import PostCard from "@/components/shared/PostCard";
import { getBeritas } from "@/lib/actions/postActions";

const PostList = async () => {
  const beritas = await getBeritas();

  if (!beritas) return <p>Belum ada postingan.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {beritas.map((data) => (
        <PostCard post={data} key={data.id} />
      ))}
    </div>
  );
};

export default PostList;
