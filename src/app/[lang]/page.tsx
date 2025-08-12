import { getTranslations, SupportedLocale } from "@/app/lib/i18n";
import { notFound } from "next/navigation";
import Hero from "../components/hero/hero";

interface LangPageProps {
  params: Promise<{ lang: string }>;
}

export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;
  
  try {
    const translations = await getTranslations(lang as SupportedLocale);
    
    return (
      <div>
        <Hero />
        {/* Outros componentes da página principal podem ser adicionados aqui */}
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  return [
    { lang: 'pt-BR' },
    { lang: 'en' },
    { lang: 'es' },
  ];
}
