import Image from "next/image";
import Link from "next/link";

const WisataMain = () => {
  return (
    <div className="h-screen py-16 2xl:py-32 grid grid-cols-[1fr_2fr] gap-32">
      <div className="relative">
        <Image
          src="/images/wisata-01.jpg"
          alt="image of wisata xxx"
          fill
          className="object-cover"
        />
      </div>
      <div className="py-8 2xl:py-16">
        <div className="w-1/2">
          <p className="sub-title mb-2">WISATA ALAM</p>
          <p className="text-3xl 2xl:text-5xl mb-6">
            Lorem ipsum dolor sit amet
          </p>
          <p className="text-xl 2xl:text-2xl mb-16">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
            quam omnis nulla voluptates! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Asperiores, molestiae.
          </p>

          <Link
            href="/"
            className="py-2 px-6 border border-brand-secondary rounded-full font-semibold hover:bg-brand-secondary hover:text-brand transition-all duration-300">
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WisataMain;
