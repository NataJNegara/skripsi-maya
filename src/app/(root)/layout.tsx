import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserButton from "@/components/UserButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header userButton={<UserButton />} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
