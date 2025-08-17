import NotFound from "@/app/not-found";
import { getPostBySlug } from "@/lib/actions/postActions";
import { formatDateTime } from "@/lib/utils";
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
      <div className="text-center mb-8 md:mb-16 flex flex-col gap-4 md:gap-6">
        <p className="content-title">{berita.title}</p>
        <p className="text-xs sm:text-sm font-semibold text-brand-secondary italic">
          {formatDateTime(berita.createdAt).dateOnly}
        </p>
      </div>
      <div className="relative content-banner-image mb-16">
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
