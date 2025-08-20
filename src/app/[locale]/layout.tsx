import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import "../globals.css";
import MainNav from "../components/main-nav/main-nav";
import Footer from "../components/footer/footer";
import AnalyticsProvider from "../components/analytics-provider/analytics-provider";
import { LenisProvider } from "../components/lenis-provider";
import CookieBanner from "../views/ui/cookie-banner";

const locales = ['pt-BR', 'en', 'es'] as const;

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

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Validar se o idioma é suportado
  if (!locales.includes(locale as any)) {
    return {
      title: "Idioma não suportado - ISOART",
    };
  }

  return {
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
    metadataBase: new URL("https://isoart.com.br"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt-BR",
        "en": "/en",
        "es": "/es",
      },
    },
    openGraph: {
      title: "Isoart - Soluções em EPS e PIR para Construção Civil",
      description: "Especialistas em soluções térmicas com EPS e PIR para construção civil, embalagens e isolamento. Telhas, forros, molduras e mais.",
      url: `https://isoart.com.br/${locale}`,
      siteName: "ISOART",
      locale: locale,
      type: "website",
      images: [
        {
          url: "/img/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "ISOART - Soluções em EPS e PIR",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Isoart - Soluções em EPS e PIR para Construção Civil",
      description: "Especialistas em soluções térmicas com EPS e PIR para construção civil, embalagens e isolamento. Telhas, forros, molduras e mais.",
      images: ["/img/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code",
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validar se o idioma é suportado
  if (!locales.includes(locale as any)) {
    return null; // Retornar null para idiomas não suportados
  }

  return (
    <div className={`${inter.variable} ${redhat.variable}`}>
      <LenisProvider>
        <MainNav />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <AnalyticsProvider />
      </LenisProvider>
    </div>
  );
}

export default LocaleLayout;
