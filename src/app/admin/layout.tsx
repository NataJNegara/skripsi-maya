import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AdminSidebar from "@/components/account/AdminSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div
        className={`grid grid-cols-1 xl:grid-cols-[16rem_auto] h-full min-h-screen  pt-32 px-20`}>
        <AdminSidebar />
        <div className="px-6">{children}</div>
      </div>
      <Footer />
    </>
  );
}
