import Image from "next/image";
import bg from "../../public/images/muara-enim.jpg";

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
          className="object-cover"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full">
        <div className="text-white text-center">
          <p className="text-2xl xl:text-3xl 2xl:text-7xl font-caveat capitalize mb-4">
            worderful
          </p>
          <h1 className="font-caveat text-2xl">Muara Enim</h1>
          <p className="text-center px-10 xl:w-1/2 mx-auto">
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
