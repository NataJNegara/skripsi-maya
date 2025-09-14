import { Suspense } from "react";
import PostList from "./PostList";
import Spinner from "@/components/Spinner";

const Page = () => {
  return (
    <section className="page-container">
      <div className="text-center flex flex-col gap-8 items-center justify-center mb-32">
        <p className="page-title">Blog</p>
        <div className="">
          <p className="md:text-xl">
            Berita, cerita, dan sorotan wisata Muara Enim kami hadirkan untuk
            Anda. Temukan yang baru, yang menarik, dan yang menginspirasi.
          </p>
        </div>
      </div>

      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </section>
  );
};

export default Page;
