import { fontMak } from "@/assets/fonts";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Caveat, Josefin_Sans } from "next/font/google";
import "./globals.css";

import "leaflet/dist/leaflet.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const caveatSans = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explore Muara Enim",
  description:
    "Jelajahi keindahan wisata Muara Enim, Sumatera Selatan! Temukan destinasi alam menakjubkan untuk liburan seru bersama keluarga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${fontMak.variable} ${caveatSans.variable} antialiased relative`}>
        {children}
        <Toaster
          richColors
          theme="light"
          toastOptions={{
            classNames: {
              actionButton: "bg-brand-accent! text-brand-white-alt!",
            },
          }}
        />
      </body>
    </html>
  );
}
