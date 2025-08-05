import { Button } from "@/components/ui/button";
import SignInForm from "./SignInForm";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className="flex flex-col 2xl:gap-2 text-center mb-10">
        <p className="text-center text-xl 2xl:text-4xl font-semibold">
          Selamat Datang Kembali!
        </p>
        <p className="text-sm opacity-70">Login kembali ke akun anda.</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <SignInForm />

        <div className="flex items-center text-center 2xl:mt-8 max-w-sm w-full">
          <span className="flex-1 h-[1px] bg-gray-200"></span>
          <span className="px-4 font-semibold text-gray-400">or</span>
          <span className="flex-1 h-[1px] bg-gray-200"></span>
        </div>

        <div className="w-full max-w-sm">
          <Button
            className="flex items-center gap-4 w-full cursor-pointer bg-white hover:bg-gray-200 border text-dark"
            size="lg">
            <Image
              src={"https://authjs.dev/img/providers/google.svg"}
              alt="google logo"
              width={24}
              height={24}
            />
            <span>Login dengan Google</span>
          </Button>
        </div>
        <div className="">
          <p className="text-sm">
            Belum punya akun?{" "}
            <Link
              href="/sign-up"
              className="text-blue-500 border-b border-blue-300">
              Buat akun baru
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
