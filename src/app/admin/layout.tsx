import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserButton from "@/components/UserButton";
import { FileUploadProvider } from "@/context/FileUploadContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header userButton={<UserButton />} />
      <div className="page-container">
        <div className="p-4">
          <FileUploadProvider>{children}</FileUploadProvider>
        </div>
      </div>
      <Footer />
    </>
  );
}
