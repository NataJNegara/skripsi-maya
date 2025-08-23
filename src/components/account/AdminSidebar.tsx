import Link from "next/link";
import SignOutButton from "../SignOutButton";
import { LayoutDashboard, MountainSnow, Newspaper } from "lucide-react";

const sidebarNav = [
  { title: "dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
  {
    title: "postingan",
    href: "/admin/postingan",
    icon: <Newspaper size={20} />,
  },
  { title: "wisata", href: "/admin/wisata", icon: <MountainSnow size={20} /> },
];

const AdminSidebar = () => {
  return (
    <nav className="border-r">
      <ul className="flex flex-col gap-4 h-full">
        {sidebarNav.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="flex gap-4 items-center px-6 py-3 capitalize font-semibold hover:bg-brand-secondary hover:text-white">
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}

        <li className="mt-64">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
