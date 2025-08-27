import Image from "next/image";

type EyeCatcherProps = {
  text: string;
  secondText?: string;
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

        <div className="absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-brand-white-alt">
          <p className="capitalize text-4xl xl:text-6xl 2xl:text-7xl text-center font-caveat font-bold text-balance">
            {props.text}
          </p>
          {props.secondText && (
            <p className="capitalize text-4xl xl:text-6xl 2xl:text-7xl text-center font-caveat font-bold text-balance">
              {props.secondText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EyeCatcher;
