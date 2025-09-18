import Hero from './components/hero/hero';
import SobreEmpresa from './components/sobre-empresa/sobre-empresa';
import SolucoesSection from './components/solucoes-grid/solucoes-grid-02';
import ContactComponent from './components/contact/contact-component';

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;

    return (
        <div>
            <main>
                <Hero />
                <SobreEmpresa locale={locale} />
                <SolucoesSection />
                <ContactComponent locale={locale} />
            </main>
        </div>
    );
}
