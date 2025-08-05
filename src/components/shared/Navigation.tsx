import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { footerSocials } from "@/db/data-service";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { title: "Destinasi", href: "/destinasi" },
  { title: "Event", href: "/events" },
  { title: "Blog", href: "/blogs" },
  { title: "Tentang", href: "/tentang" },
  { title: "Account", href: "/sign-in" },
];

const Navigation = ({
  isScrolled,
  pathname,
}: {
  isScrolled: boolean;
  pathname: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="cursor-pointer w-8 h-8 relative">
          <span
            className={cn(
              "absolute w-full h-0.5 bg-brand left-0 top-[11px] transition-all duration-300",
              !isScrolled ? "bg-white" : "",
              pathname !== "/" ? "bg-brand!" : ""
            )}></span>
          <span
            className={cn(
              "absolute w-full h-0.5 bg-brand left-0 bottom-[11px] transition-all duration-300",
              !isScrolled ? "bg-white" : "",
              pathname !== "/" ? "bg-brand!" : ""
            )}></span>
        </button>
      </SheetTrigger>
      <SheetContent className="min-w-1/3 p-16 bg-brand text-white border-0">
        <SheetHeader className="p-0">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="relative h-full">
          <div className="mt-16">
            <p className="uppercase text-sm text-brand-secondary tracking-wider mb-4">
              MENU
            </p>

            <ul className="flex flex-col gap-4">
              {navigationLinks.map((item) => (
                <li key={item.href} className="capitalize text-5xl font-mak">
                  <SheetClose asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-8 bg-brand-secondary opacity-25" />

          <div>
            <p className="uppercase text-sm text-brand-secondary tracking-wider mb-4">
              socials
            </p>

            <ul className="flex flex-col">
              {footerSocials.map((item) => (
                <li key={item.title} className="capitalize">
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navigation;
