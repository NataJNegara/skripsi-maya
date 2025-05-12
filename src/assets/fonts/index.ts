import localFont from "next/font/local";

export const fontMak = localFont({
  src: [
    {
      path: "./MAK.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./MAK-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mak",
});
