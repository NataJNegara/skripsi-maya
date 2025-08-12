import NotFound from "@/app/not-found";
import { getPostBySlug } from "@/lib/actions/postActions";
import Image from "next/image";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const berita = await getPostBySlug(slug);

  if (!berita) return <NotFound />;

  return (
    <section className="page-container">
      <div className="text-center mb-16">
        <h2>{berita.title}</h2>
        <p className="text-xs sm:text-sm font-semibold text-brand-secondary">
          tanggal
        </p>
      </div>
      <div className="relative w-full h-[500px] mb-16">
        <Image
          src={berita.banner}
          alt={`gambar untuk postingan ${berita.title}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="">
        <p className="mb-4">{berita.preview}</p>
        <div
          dangerouslySetInnerHTML={{ __html: berita?.content as TrustedHTML }}
        />
      </div>
    </section>
  );
};

export default Page;
