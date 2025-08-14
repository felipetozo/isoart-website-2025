import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import "../globals.css";
import MainNav from "../components/main-nav/main-nav";
import Footer from "../components/footer/footer";
import AnalyticsProvider from "../components/analytics-provider/analytics-provider";
import { LenisProvider } from "../components/lenis-provider";
import CookieBanner from "../views/ui/cookie-banner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const redhat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat",
  display: "swap",
  preload: false,
});

interface LangLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = params;
  
  // Validar se o idioma é suportado
  const supportedLocales = ['pt-BR', 'en', 'es'];
  if (!supportedLocales.includes(lang)) {
    return {
      title: "Idioma não suportado - ISOART",
    };
  }

  return {
    title: "ISOART - Soluções em EPS e PIR",
    description: "Especialistas em soluções térmicas com EPS e PIR para construção civil",
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
      canonical: `/${lang}`,
      languages: {
        'pt-BR': '/pt-BR',
        'en': '/en',
        'es': '/es',
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: `https://isoart.stubborn.com.br/${lang}`,
      siteName: 'ISOART',
      title: "ISOART - Soluções em EPS e PIR",
      description: "Especialistas em soluções térmicas com EPS e PIR para construção civil",
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
      title: "ISOART - Soluções em EPS e PIR",
      description: "Especialistas em soluções térmicas com EPS e PIR para construção civil",
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
  };
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = params;
  
  // Validar se o idioma é suportado
  const supportedLocales = ['pt-BR', 'en', 'es'];
  if (!supportedLocales.includes(lang)) {
    return null; // Retornar null para idiomas não suportados
  }

  return (
    <html lang={lang} className={`${inter.variable} ${redhat.variable}`}>
      <head>
        <link rel="preload" href="/img/isoart-logotipo.svg" as="image" type="image/svg+xml" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            *, *::before, *::after { box-sizing: border-box; }
            
            body { 
              font-family: var(--font-inter), Arial, sans-serif;
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #171717;
            }
            
            .hero-section {
              width: 100vw;
              height: 80vh;
              position: relative;
              overflow: hidden;
            }
            
            .nav-container {
              width: 100%;
              position: fixed;
              top: 0;
              left: 0;
              z-index: 9999;
            }
          `
        }} />
      </head>
      <body>
        <LenisProvider>
          <MainNav />
          <main>{children}</main>
          <Footer />
          <AnalyticsProvider />
          <CookieBanner />
        </LenisProvider>
      </body>
    </html>
  );
}
