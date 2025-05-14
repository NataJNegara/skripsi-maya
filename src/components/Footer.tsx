import Link from "next/link";
import { Separator } from "./ui/separator";

const footerLinks = [
  { title: "destinasi", href: "/destinasi" },
  { title: "event", href: "/event" },
  { title: "blog", href: "/blog" },
  { title: "tentang", href: "/tentang" },
  { title: "faq", href: "/faq" },
];

const footerSocials = [
  { title: "instagram", href: "/" },
  { title: "facebook", href: "/" },
  { title: "youtube", href: "/" },
];

const Footer = () => {
  return (
    <footer className="w-full padding-x bg-brand-foreground text-brand-white">
      <div className="grid sm:grid-cols-[auto_1fr] gap-16 py-10 mb-16">
        <div className="">
          <p className="text-4xl xl:text-5xl uppercase font-mak mb-8">
            muara enim
          </p>
          <p>Alamat : jalan xxxx</p>
          <p>Telephone : xxx-xxxx-xxxx</p>
          <p>Email : example@gmail.com</p>
        </div>
        <div className="flex justify-between gap-16 sm:justify-self-end">
          <div className="">
            <p className="uppercase font-semibold opacity-50 mb-4">
              navigations
            </p>
            <ul className="flex flex-col gap-1">
              {footerLinks.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="capitalize font-semibold">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <p className="uppercase font-semibold opacity-50 mb-4">
              social media
            </p>
            <ul className="flex flex-col gap-1">
              {footerSocials.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="capitalize font-semibold">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Separator className="bg-brand-white" />
      <div className="text-xs sm:text-base flex items-center justify-between py-4">
        <p>&copy;{new Date().getFullYear()} All rights reserved</p>
        <div className="flex gap-2 sm:gap-6">
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-service">Terms of service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
