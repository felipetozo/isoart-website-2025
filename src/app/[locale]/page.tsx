import Hero from './components/hero/hero';
import SobreEmpresa from './components/sobre-empresa/sobre-empresa';
import SolucoesGrid from './components/solucoes-grid/solucoes-grid';
import ContactComponent from './components/contact/contact-component';
import { useTranslations } from 'next-intl';

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
                <SolucoesGrid locale={locale} />
                <ContactComponent locale={locale} />
            </main>
        </div>
    );
}
