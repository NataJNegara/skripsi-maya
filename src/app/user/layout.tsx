import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserSidebar from "@/components/account/UserSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div
        className={`grid grid-cols-1 xl:grid-cols-[16rem_auto] h-full min-h-screen xl:gap-4 pt-32 px-20`}>
        <UserSidebar />
        <div className="p-4">{children}</div>
      </div>
      <Footer />
    </>
  );
}
