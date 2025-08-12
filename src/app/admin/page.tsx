import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
  const username = session?.user.name || session?.user.email;

  return (
    <div className="">
      <p className="dashboard-title">Hello, {username}</p>
    </div>
  );
};

export default Page;
