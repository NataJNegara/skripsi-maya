"use client";

import { cn } from "@/lib/utils";
import { CircleUserRound, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigationLinks = [
  { title: "Destinasi", href: "/destinasi" },
  { title: "Event", href: "/event" },
  { title: "Blog", href: "/blog" },
  { title: "Tentang", href: "/tentang" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed w-full padding-x z-50 text-white transition-all duration-300",
        isScrolled ? "bg-white text-brand shadow-sm" : ""
      )}>
      <div className="h-20 grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center justify-between">
        <Link href="/" className="uppercase text-2xl font-bold font-mak">
          Muara Enim
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-16">
            {navigationLinks.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="font-semibold">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block justify-self-end">
          <CircleUserRound className="w-8 h-8" strokeWidth={1} />
        </div>
        <div className="block lg:hidden justify-self-end">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
