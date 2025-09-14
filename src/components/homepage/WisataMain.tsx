import Image from "next/image";
import Link from "next/link";

type WisataMain = {
  title: string;
  subTitle: string;
  descriptionText: string;
  link: string;
  imageUrl: string;
};

const WisataMain = ({
  title,
  subTitle,
  descriptionText,
  link,
  imageUrl,
}: WisataMain) => {
  return (
    <div className="h-full py-16 2xl:py-32 grid xl:grid-cols-[1fr_2fr] xl:gap-32">
      <div className="relative h-[500px] xl:h-full w-full">
        <Image
          src={imageUrl}
          alt={`image of ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="py-8 2xl:py-16">
        <div className="xl:w-1/2">
          <p className="sub-title mb-2">{title}</p>
          <p className="font-caveat text-3xl 2xl:text-5xl mb-6 capitalize">
            {subTitle}
          </p>
          <p className="text-xl 2xl:text-2xl xl:pb-16 leading-none">
            {descriptionText}
          </p>

          <Link
            href={link}
            className="py-2 px-6 border border-brand-secondary rounded-full font-semibold hover:bg-brand-secondary hover:text-brand transition-all duration-300">
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WisataMain;
