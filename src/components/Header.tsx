import { CircleUserRound } from "lucide-react";
import Link from "next/link";

const navigationLinks = [
  { title: "Destinasi", href: "/destinasi" },
  { title: "Event", href: "/event" },
  { title: "Blog", href: "/blog" },
  { title: "Tentang", href: "/tentang" },
];

const Header = () => {
  return (
    <div className="fixed w-full px-20 z-50 bg-white border-b">
      <div className="h-20 grid grid-cols-[1fr_auto_1fr] items-center justify-between">
        <Link href="/" className="uppercase text-2xl font-mak">
          Muara Enim
        </Link>
        <nav>
          <ul className="flex items-center gap-16">
            {navigationLinks.map((item) => (
              <li key={item.title}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="justify-self-end">
          <CircleUserRound className="w-8 h-8" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};

export default Header;
