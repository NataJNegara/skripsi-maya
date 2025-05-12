import Image from "next/image";
import bg from "../../public/images/muara-enim.jpg";

const Hero = () => {
  return (
    <div className="h-screen w-full relative pt-20">
      <div className="h-[calc(100vh-160px)] relative">
        <Image
          src={bg}
          fill
          alt="muara enim landscape image"
          quality={60}
          placeholder="blur"
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full">
        <div className="text-white text-center">
          <p className="text-2xl xl:text-3xl 2xl:text-5xl font-mak uppercase mb-4">
            worderful
          </p>
          <h1>Muara Enim</h1>
          <p className="text-center w-1/2 mx-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
            in dolorum reiciendis necessitatibus cupiditate hic quidem libero.
            Cupiditate, dolorum suscipit?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
