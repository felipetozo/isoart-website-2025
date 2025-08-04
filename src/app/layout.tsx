import type { Metadata } from "next";
import { Red_Hat_Display, Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/app/components/main-nav/main-nav";
import Footer from '@/app/components/footer/footer';
import AnalyticsProvider from "@/app/components/analytics-provider/analytics-provider";
import { LenisProvider } from "@/app/components/lenis-provider";

const redhat = Red_Hat_Display({
  variable: "--font-redhat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isoart - Soluções em EPS e PIR",
  description: "A Isoart se destaca oferecendo soluções inovadoras e sustentáveis em EPS (Poliestireno Expandido) e PIR",
  keywords: "EPS, PIR, Poliestireno Expandido, isolamento térmico, telhas, lajes, construção civil, molduras, forros, embalagens",
  authors: [{ name: "Felipe Tozo e Isoart"}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${redhat.variable} ${inter.variable} antialiased`}>
        <LenisProvider>
          <MainNav />
          {children}
          <Footer />
          <AnalyticsProvider />
        </LenisProvider>
      </body>
    </html>
  );
}