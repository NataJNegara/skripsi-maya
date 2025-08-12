import { Suspense } from "react";
import PostList from "./PostList";

const Page = () => {
  return (
    <section className="page-container">
      <div className="text-center flex flex-col gap-8 items-center justify-center mb-32">
        <p>BLOG</p>
        <div className="">
          <h2 className="capitalize">Title Text Here</h2>
          <p className="text-2xl font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            ullam obcaecati ut molestias. Ratione impedit accusantium veritatis
            dolorum aut vitae et ullam quae, excepturi accusamus quisquam
            perferendis cumque! Dolores, officiis.
          </p>
        </div>
      </div>

      <Suspense fallback={<p>loading...</p>}>
        <PostList />
      </Suspense>
    </section>
  );
};

export default Page;
