import { fontMak } from "@/assets/fonts";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import "leaflet/dist/leaflet.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const caveatSans = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} ${fontMak.variable} ${caveatSans.variable} antialiased relative`}>
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
