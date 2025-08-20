import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false, // Reduzir payload inicial
});

const redhat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat",
  display: "swap",
  preload: false, // Reduzir payload inicial
});

export const metadata: Metadata = {
  title: "Isoart - Soluções em EPS e PIR para Construção Civil",
  description: "Especialistas em soluções térmicas com EPS e PIR para construção civil, embalagens e isolamento. Telhas, forros, molduras e mais.",
  keywords: "EPS, PIR, isolamento térmico, construção civil, telhas, forros, embalagens, ISOART",
  authors: [{ name: "ISOART" }],
  creator: "ISOART",
  publisher: "ISOART",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://isoart.stubborn.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://isoart.stubborn.com.br',
    siteName: 'ISOART',
    title: 'Isoart - Soluções em EPS e PIR para Construção Civil',
    description: 'Especialistas em soluções térmicas com EPS e PIR para construção civil, embalagens e isolamento. Telhas, forros, molduras e mais.',
    images: [
      {
        url: '/img/isoart-logotipo.svg',
        width: 400,
        height: 100,
        alt: 'ISOART - Logo',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Isoart - Soluções em EPS e PIR para Construção Civil',
    description: 'Especialistas em soluções térmicas com EPS e PIR para construção civil, embalagens e isolamento. Telhas, forros, molduras e mais.',
    images: ['/img/isoart-logotipo.svg'],
    creator: '@isoart',
    site: '@isoart',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${redhat.variable}`}>
      <head>
        {/* DNS prefetch para fontes */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;