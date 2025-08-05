import Link from "next/link";
import SignUpForm from "./SignUpForm";

const Page = () => {
  return (
    <div className="">
      <div className="flex flex-col 2xl:gap-2 text-center mb-10 pt-8">
        <p className="text-center text-xl 2xl:text-4xl font-semibold">
          Buat Akun
        </p>
        <p className="text-sm opacity-70">Bergabung dengan komunitas kami.</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <SignUpForm />

        <div className="">
          <p className="text-sm">
            Sudah punya akun?{" "}
            <Link
              href="/sign-in"
              className="text-blue-500 border-b border-blue-300">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
