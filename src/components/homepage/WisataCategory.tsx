import { wisataData } from "@/db/data-service";
import Image from "next/image";
import Link from "next/link";

const WisataCategory = () => {
  return (
    <section className="section">
      <div className="xl:w-1/2 mb-16">
        <h2>Wisata</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
          excepturi consequuntur reprehenderit quasi earum magnam asperiores
          nemo libero adipisci. Fugiat quod eius ullam quibusdam reiciendis!
          Eius quasi ad iste tenetur? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Doloribus quasi dignissimos alias et iure. Voluptas
          architecto esse, hic numquam distinctio quo minus repellendus et
          maiores obcaecati voluptates assumenda dicta animi!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:px-10 items-center justify-center">
        {wisataData.map((wisata) => (
          <div
            key={wisata.title}
            className="relative h-[400px] xl:h-[500px]  2xl:h-[600px]  rounded-2xl overflow-hidden hover:[&_img]:scale-105 hover:[&_img]:grayscale-50">
            <Image
              src={wisata.bgImage}
              fill
              alt={`image of wisata ${wisata.title}`}
              className="object-cover transition-all duration-700"
            />
            <div className="absolute flex flex-col h-full items-center justify-center text-white text-center">
              <p className="text-2xl uppercase font-mak font-bold">
                {wisata.title}
              </p>
              <p className="px-4">{wisata.description}</p>
            </div>
            <Link
              href={wisata.href}
              className="absolute py-1 px-4 bg-white rounded-full bottom-8 left-1/2 -translate-x-1/2 font-semibold text-sm">
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WisataCategory;
