import NotFound from "@/app/not-found";
import { getPostBySlug } from "@/lib/actions/postActions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const event = await getPostBySlug(slug);

  if (!event) return <NotFound />;

  return (
    <section className="page-container">
      <div className="text-center mb-8 md:mb-16 flex flex-col gap-4 md:gap-6">
        <p className="content-title">{event.title}</p>
        <p className="italic text-xs sm:text-sm font-semibold text-brand-secondary">
          {formatDateTime(event.createdAt).dateOnly}
        </p>
      </div>
      <div className="relative content-banner-image mb-16">
        <Image
          src={event.banner}
          alt={`gambar untuk postingan ${event.title}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="">
        <p className="mb-4">{event.preview}</p>
        <div
          dangerouslySetInnerHTML={{ __html: event?.content as TrustedHTML }}
        />
      </div>
    </section>
  );
};

export default Page;
