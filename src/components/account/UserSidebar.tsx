import Link from "next/link";

const userSidebarLinks = [
  { title: "Dashboard", href: "/user" },
  { title: "Favorite", href: "/user/favorite" },
  { title: "Profile", href: "/user/profile" },
];

const UserSidebar = () => {
  return (
    <nav className="border-r">
      <ul className="flex flex-col gap-4 h-full">
        {userSidebarLinks.map((item) => (
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

export default UserSidebar;
