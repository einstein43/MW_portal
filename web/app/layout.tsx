import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

 

export const metadata: Metadata = {
  title: "Multiway IT Klantenportaal",
  description: "Mulitway IT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
