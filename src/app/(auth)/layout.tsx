import Image from "next/image";
import bgUrl from "/public/images/bedegung/curup-tenang-bedegung-01.jpg";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen h-full relative">
      <div className="absolute left-8 top-6">
        <Link href="/" className="text-md font-bold">
          EXPLORE MUARA ENIM
        </Link>
      </div>
      <div className="grid xl:grid-cols-[1fr_2fr] h-screen">
        <div className="flex flex-col justify-center px-8 py-10 2xl:p-0">
          {children}
        </div>
        <div className="hidden xl:block relative">
          <Image
            src={bgUrl}
            alt="image of login page"
            fill
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
