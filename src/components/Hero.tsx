import Image from "next/image";
import bg from "../../public/images/hero.jpg";

const Hero = () => {
  return (
    <div className="h-screen w-full relative">
      <div className="h-screen relative">
        <Image
          src={bg}
          fill
          alt="muara enim landscape image"
          quality={60}
          placeholder="blur"
          className="object-cover brightness-95"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full">
        <div className="text-white text-center">
          <p className="font-caveat text-2xl xl:text-4xl capitalize">
            worderful
          </p>
          <h1 className="text-[clamp(3rem,6vw,160px)] leading-none font-caveat capitalize mb-4">
            Muara Enim
          </h1>
          <p className="text-sm md:text-base xl:text-lg text-center px-10 xl:w-1/2 mx-auto">
            Pesona Serasan - Muara Enim menyapa dengan pesona tak tertandingi.
            Air terjun, lembah, dan tradisi menyatu dalam harmoni. Serasan
            Sekundang, keindahan yang abadi dalam ingatan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
