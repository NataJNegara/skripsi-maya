"use client";

import { cn } from "@/lib/utils";
import { CircleUserRound, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigationLinks = [
  { title: "Destinasi", href: "/destinasi" },
  { title: "Event", href: "/events" },
  { title: "Blog", href: "/blogs" },
  { title: "Tentang", href: "/tentang" },
];

const Header = () => {
  const [prevScroll, setPrevScroll] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currScroll = window.pageYOffset;
      setIsVisible(prevScroll > currScroll);
      setPrevScroll(currScroll);

      if (navRef.current && window.scrollY > 100) {
        navRef.current.style.backgroundColor = "#fff";
        navRef.current.style.color = "#31511e";
      }
      if (navRef.current && window.scrollY < 100) {
        navRef.current.style.backgroundColor = "";
        navRef.current.style.color = "#fff";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return (
    <div
      ref={navRef}
      className={cn(
        "fixed w-full padding-x z-50 text-white transition-all duration-300",
        isVisible ? "" : "-translate-y-full",
        pathname !== "/" ? "text-brand!" : ""
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
