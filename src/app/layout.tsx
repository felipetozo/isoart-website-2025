import type { Metadata } from "next";
import { Red_Hat_Display, Inter } from "next/font/google";
import "./globals.css";

const RedHat = Red_Hat_Display({
  variable: "--font-RedHat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isoart",
  description: "A Isoart se destaca oferecendo soluções inovadoras e sustentáveis em EPS (Poliestireno Expandido) e PIR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${RedHat.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
