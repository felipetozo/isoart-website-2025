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
        {/* Removed heavy image preload to reduce initial payload */}
        {/* Removed banner preload to reduce initial payload */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* CSS Crítico Mínimo para LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Reset essencial */
            *, *::before, *::after { box-sizing: border-box; }
            
            /* Fonts críticas */
            body { 
              font-family: var(--font-inter), Arial, sans-serif;
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #171717;
            }
            
            /* Hero crítico - LCP */
            .hero-section {
              width: 100vw;
              height: 80vh;
              position: relative;
              overflow: hidden;
            }
            
            /* Navigation fixa */
            .nav-container {
              width: 100%;
              position: fixed;
              top: 0;
              left: 0;
              z-index: 9999;
            }
          `
        }} />
        
        {/* Carregamento otimizado de fontes */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Carregar fontes de forma otimizada
            if ('fonts' in document) {
              Promise.all([
                document.fonts.load('1em Inter'),
                document.fonts.load('1em Red Hat Display')
              ]).then(() => {
                document.documentElement.classList.add('fonts-loaded');
              });
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