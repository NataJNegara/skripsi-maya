import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import PostList from "./PostList";

const Page = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-12">
        <p className="dashboard-title">Postingan</p>
        <div className="flex justify-end">
          <Link
            href="/admin/postingan/baru"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 px-4 py-2 text-indigo-50 flex items-center gap-2">
            <span>Postingan baru</span>
            <CirclePlus />
          </Link>
        </div>
      </div>

      {/* searchbar & filter */}
      <div className="flex justify-between mb-8">
        <SearchBar />
        <div className="">
          <Button>filter here</Button>
        </div>
      </div>

      <p className="text-sm italic my-8">3 postingan ditemukan.</p>

      {/* table of content */}
      <PostList />
    </div>
  );
};

export default Page;
