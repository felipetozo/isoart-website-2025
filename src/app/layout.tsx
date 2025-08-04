import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";
import "./globals.css";
import MainNav from "./components/main-nav/main-nav";
import Footer from "./components/footer/footer";
import AnalyticsProvider from "./components/analytics-provider/analytics-provider";
import { LenisProvider } from "./components/lenis-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const redhat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Isoart - Soluções em EPS e PIR para Construção Civil",
  description: "Especialistas em soluções térmicas com EPS e PIR para construção civil, embalagens e isolamento. Telhas, forros, molduras e mais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${redhat.variable}`}>
      <head>
        {/* Preload recursos críticos */}
        <link rel="preload" href="/img/isoart-logotipo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/img/geral/endereco-01-01.avif" as="image" />
        <link rel="preload" href="/img/HeroBanners/banner001.webp" as="image" fetchPriority="high" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* CSS Crítico Inline para melhorar LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Reset crítico */
            *, *::before, *::after { box-sizing: border-box; }
            
            /* Fonts críticas */
            body { 
              font-family: var(--font-inter), Arial, sans-serif;
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #171717;
            }
            
            /* Cores críticas para textos brancos */
            .hero-container h1,
            .hero-container p,
            .hero-title,
            .nav-chevron,
            .nav-button {
              color: rgba(241, 244, 247, 1) !important;
            }
            
            .hero-container p {
              color: rgba(241, 244, 247, 0.75) !important;
            }
            
            /* Hero crítico */
            .hero-section {
              width: 100vw;
              height: 80vh;
              position: relative;
              overflow: hidden;
            }
            
            /* Primeira imagem do slider - LCP */
            .hero-section .slide:first-child {
              background-image: url('/img/HeroBanners/banner001.webp') !important;
              background-size: cover !important;
              background-position: center !important;
            }
            
            /* Navigation crítica */
            .nav-container {
              width: 100%;
              position: fixed;
              top: 0;
              left: 0;
              z-index: 9999;
            }
            
            /* Layout crítico */
            .main-nav-wrapper {
              width: 90%;
              max-width: 1600px;
              margin: 0 auto;
              padding: 1rem;
            }
            
            /* Loading state */
            .loading {
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            .loaded {
              opacity: 1;
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
        </LenisProvider>
      </body>
    </html>
  );
}