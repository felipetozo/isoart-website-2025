import ContactForm from './contact-form';
import { getTranslations } from 'next-intl/server';

interface ContatoPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ContatoPage({ params }: ContatoPageProps) {
    const { locale } = await params;
    
    return (
        <div>
            {/* ContactForm component handles all the form logic */}
            <ContactForm locale={locale} />
        </div>
    );
}