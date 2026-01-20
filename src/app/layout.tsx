import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.scss";
import { Aside } from "@/components/aside/aside";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

const satoshiFont = localFont({
  src: [
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Reya assignment",
  description: "Reya assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={satoshiFont.variable}>
      <body className="font-sans font-medium antialiased bg-reya-cod-gray text-reya-athens-gray text-reya-gray">
        <div className="h-screen flex flex-col">
          <Header />
          <div className="flex flex-1 min-h-0">
            <Aside />
            <main className="flex-1 bg-reya-cod-gray">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
