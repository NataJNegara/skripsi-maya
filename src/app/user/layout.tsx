import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserButton from "@/components/UserButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header userButton={<UserButton />} />
      <div className="page-container">
        <div className="p-4">{children}</div>
      </div>
      <Footer />
    </>
  );
}
