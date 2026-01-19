import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.scss";

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
