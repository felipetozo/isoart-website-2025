import Hero from "../components/hero/hero";

interface LangPageProps {
  params: { lang: string };
}

function LangPage({ params }: LangPageProps) {
  const { lang } = params;
  
  return (
    <div>
      <Hero />
      {/* Outros componentes da página principal podem ser adicionados aqui */}
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { lang: 'pt-BR' },
    { lang: 'en' },
    { lang: 'es' },
  ];
}

export default LangPage;
