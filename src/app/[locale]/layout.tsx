// src/app/layout.tsx - Layout com suporte a landing pages sem nav/footer
import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";
import MainNav from "./components/main-nav/main-nav";
import Footer from "./components/Footer/footer";
import AnalyticsProvider from "./components/analytics-provider/analytics-provider";
import { LenisProvider } from "./components/lenis-provider";
import CookieBanner from "./views/ui/cookie-banner";
import SuriChatbotProvider from "./components/SuriChatbotProvider";
import { headers } from "next/headers";

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Componente condicional para layout (sem nav/footer para landing pages específicas)
function ConditionalLayout({ 
  children, 
  locale, 
  pathname 
}: { 
  children: React.ReactNode; 
  locale: string;
  pathname: string;
}) {
  // Remove locale do pathname para o regex
  const cleanPathname = pathname.startsWith(`/${locale}`) 
    ? pathname.replace(`/${locale}`, '') 
    : pathname;

  // ← ESPECÍFICO: só para /landing-pages/molduras por agora
  const isLandingPage = /\/landing-pages\/molduras/.test(cleanPathname);

  if (isLandingPage) {
    return <main>{children}</main>;
  }

  return (
    <>
      <MainNav locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}

// Layout principal com i18n e providers
async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    return null;
  }

  // ← CORRIGIDO: await headers() para resolver o erro TypeScript
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className={`${inter.variable} ${redhat.variable} font-sans`}>
            <LenisProvider>
              <ConditionalLayout locale={locale} pathname={pathname}>
                {children}
              </ConditionalLayout>
              <CookieBanner />
              <AnalyticsProvider />
              <SuriChatbotProvider />
            </LenisProvider>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;