import Image from "next/image";
import Link from "next/link";

const Introduction = () => {
  return (
    <section className="min-h-screen section padding-x">
      <div className="grid xl:grid-cols-2 gap-8 xl:gap-32">
        <div className="relative h-[70vh] xl:h-full xl:min-h-screen">
          <Image
            src="/images/wisata-01.jpg"
            alt="image of muara enim introduction"
            fill
            className="object-cover"
          />
        </div>
        <div className="xl:p-10 2xl:p-20">
          <div className="flex flex-col gap-4 mb-16">
            <p className="sub-title">selamat datang</p>
            <p className="text-2xl xl:text-3xl 2xl:text-5xl font-semibold font-mak">
              Muara Enim Kota Serasan Sekundang
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis fugiat nemo cupiditate officia maxime necessitatibus
              aperiam, accusamus officiis esse sed cum quibusdam saepe corrupti
              cumque reiciendis iure ipsam quisquam molestiae, maiores qui nam.
              Error, cupiditate. Laborum harum quia tempora sit?
            </p>
            <Link
              href="/tentang"
              className="button-brand px-6 py-2 rounded-full w-fit">
              Lebih Lanjut
            </Link>
          </div>
          <div className="relative mx-auto xl:mx-0 h-[240px] w-[200px] 2xl:h-[280px] 2xl:w-[240px]">
            <Image
              src="/images/wisata-01.jpg"
              alt="secondary image of muara enim introduction"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
