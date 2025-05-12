import Image from "next/image";

const EyeCatcher = () => {
  return (
    <div className="w-full h-[70vh] mt-20">
      <div className="h-full relative">
        <Image
          src="/images/eye-catcher-01.jpg"
          alt="post your moment in social media"
          fill
          className="object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full text-white">
          <p className="capitalize text-2xl xl:text-6xl 2xl:text-7xl text-center font-mak font-bold">
            bagikan kenangan anda
          </p>
          <p className="capitalize text-2xl xl:text-6xl 2xl:text-7xl text-center font-mak font-bold">
            #TandangMuaraEnim
          </p>
        </div>
      </div>
    </div>
  );
};

export default EyeCatcher;
