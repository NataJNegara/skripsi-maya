import { logoutAction } from "@/lib/actions/authActions";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <form action={logoutAction} className="w-full">
      <button className="flex gap-2 items-center w-full cursor-pointer hover:bg-brand! hover:text-brand-white-alt py-3 px-2 justify-start font-semibold">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </form>
  );
};

export default SignOutButton;
