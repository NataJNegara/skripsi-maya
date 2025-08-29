import { auth } from "@/lib/auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bookmark, MountainSnow, Newspaper, UserRound } from "lucide-react";

const adminNav = [
  {
    title: "postingan",
    href: "/admin/postingan",
    icon: <Newspaper size={20} />,
  },
  { title: "wisata", href: "/admin/wisata", icon: <MountainSnow size={20} /> },
];

const userNav = [
  { title: "Wishlist", href: "/user/wishlist", icon: <Bookmark /> },
  { title: "Profile", href: "/user/profile", icon: <UserRound /> },
];

const UserButton = async () => {
  const session = await auth();
  const userInitial = session?.user.name?.charAt(0).toUpperCase() || "G";

  if (!session) {
    return (
      <Link
        href="/sign-in"
        className="flex gap-2 items-center font-semibold px-4 md:px-8 py-2 border border-brand-white-alt hover:bg-brand hover:text-brand-white-alt transition-all duration-300">
        <UserRound />
        <span>Login</span>
      </Link>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 items-center cursor-pointer">
          <Avatar>
            <AvatarImage
              src={session?.user.image || ""}
              alt="user profile image"
            />
            <AvatarFallback className="bg-brand-accent text-brand-white-alt">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold">{session.user.name}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 " align="end" sideOffset={10}>
        <DropdownMenuLabel>
          <div>
            <p className="text-sm font-medium">{session.user?.name}</p>
            <p className="text-xs font-normal opacity-80">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        {session.user.role === "ADMIN" &&
          adminNav.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="w-full capitalize font-semibold flex gap-2 items-center py-1">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}

        {session.user.role === "USER" &&
          userNav.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="w-full capitalize font-semibold flex gap-2 items-center py-1">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        <DropdownMenuItem className="p-0">
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
