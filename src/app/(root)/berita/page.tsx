import { Suspense } from "react";
import PostList from "./PostList";
import Spinner from "@/components/Spinner";

const Page = () => {
  return (
    <section className="page-container">
      <div className="text-center flex flex-col gap-8 items-center justify-center mb-32">
        <p className="page-title">Blog</p>
        <div className="">
          <p className="text-xl font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            ullam obcaecati ut molestias. Ratione impedit accusantium veritatis
            dolorum aut vitae et ullam quae, excepturi accusamus quisquam
            perferendis cumque! Dolores, officiis.
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
