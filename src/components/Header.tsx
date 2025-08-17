"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navigation from "./shared/Navigation";

const navigationLinks = [
  { title: "Destinasi", href: "/destinasi" },
  { title: "Event", href: "/event" },
  { title: "Blog", href: "/berita" },
  { title: "Tentang", href: "/tentang" },
];

const Header = () => {
  const [prevScroll, setPrevScroll] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currScroll = window.pageYOffset;
      setIsVisible(prevScroll > currScroll);
      setPrevScroll(currScroll);

      if (navRef.current && window.scrollY > 100) {
        setIsScrolled(true);
        navRef.current.style.backgroundColor = "#0C2A28";
        navRef.current.style.color = "#fefae0";
      }
      if (navRef.current && window.scrollY < 100) {
        setIsScrolled(false);
        navRef.current.style.backgroundColor = "";
        navRef.current.style.color = "#fefae0";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return (
    <div
      ref={navRef}
      className={cn(
        "fixed w-full padding-x z-50 text-brand transition-all duration-300",
        isVisible ? "" : "-translate-y-full",
        pathname !== "/" && !isScrolled ? "text-brand!" : "text-brand-white"
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
          <Navigation isScrolled={prevScroll > 100} pathname={pathname} />
        </div>
      </div>
    </div>
  );
};

export default Header;
