import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserButton from "@/components/UserButton";
import AdminSidebar from "@/components/account/AdminSidebar";
import { FileUploadProvider } from "@/context/FileUploadContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header userButton={<UserButton />} />
      <div
        className={`grid grid-cols-1 xl:grid-cols-[16rem_auto] h-full min-h-screen  pt-32 px-20`}>
        <AdminSidebar />
        <div className="px-6 margin-bottom">
          <FileUploadProvider>{children}</FileUploadProvider>
        </div>
      </div>
      <Footer />
    </>
  );
}
