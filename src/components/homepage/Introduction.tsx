import Image from "next/image";
import Link from "next/link";

const Introduction = () => {
  return (
    <section className="min-h-screen section padding-x">
      <div className="grid xl:grid-cols-2 gap-8 xl:gap-32">
        <div className="relative h-[70vh] xl:h-full xl:min-h-screen">
          <Image
            src="/images/muara-enim.jpg"
            alt="image of muara enim introduction"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="xl:p-10 2xl:p-20">
          <div className="flex flex-col gap-4 mb-16">
            <p className="sub-title">selamat datang</p>
            <p className="text-2xl text-brand xl:text-3xl 2xl:text-5xl font-semibold font-caveat">
              Muara Enim Kota Serasan Sekundang
            </p>
            <p className="md:text-lg">
              Muara Enim dikenal sebagai Bumi Serasan Sekundang, sebuah tanah
              yang penuh dengan harmoni alam, budaya, dan kehidupan
              masyarakatnya. Kabupaten ini dianugerahi bentang alam yang
              memesona—mulai dari perbukitan hijau yang menenangkan mata, air
              terjun yang segar dan menyejukkan jiwa, hingga sungai-sungai yang
              mengalir membawa kesejukan.
            </p>
            <Link
              href="/tentang"
              className="button-brand px-6 py-2 rounded-full w-fit">
              Lebih Lanjut
            </Link>
          </div>
          <div className="relative mx-auto xl:mx-0 h-[240px] w-[200px] 2xl:h-[280px] 2xl:w-[240px]">
            <Image
              src="/images/muara-enim.jpg"
              alt="secondary image of muara enim introduction"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
