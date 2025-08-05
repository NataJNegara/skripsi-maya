import Link from "next/link";

const sidebarNav = [
  { title: "dashboard", href: "/admin" },
  { title: "blogs", href: "/admin/blogs" },
  { title: "events", href: "/admin/events" },
];

const AdminSidebar = () => {
  return (
    <nav className="border-r">
      <ul className="flex flex-col gap-4 h-full">
        {sidebarNav.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="block px-6 py-3 capitalize font-semibold hover:bg-brand-secondary hover:text-white">
              {item.title}
            </Link>
          </li>
        ))}

        <li className="mt-auto mb-16">
          <button className="py-3 px-6 font-semibold hover:bg-brand-secondary hover:text-white cursor-pointer w-full text-left">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
