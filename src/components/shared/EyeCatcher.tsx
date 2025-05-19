import Image from "next/image";

type EyeCatcherProps = {
  text: string;
  imageSrc: string;
};

const EyeCatcher = (props: EyeCatcherProps) => {
  return (
    <div className="w-full h-[70vh] mt-20">
      <div className="h-full relative">
        <Image
          src={props.imageSrc}
          alt="post your moment in social media"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
          <p className="capitalize text-2xl xl:text-6xl 2xl:text-7xl text-center font-mak font-bold">
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EyeCatcher;
