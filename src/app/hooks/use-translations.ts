'use client';

export function useTranslations() {
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'nav.home': 'Home',
      'nav.solutions': 'Soluções',
      'nav.about': 'Sobre',
      'nav.contact': 'Contato',
      'nav.institutional.about': 'Sobre',
      'nav.institutional.solutions': 'Soluções',
      'nav.institutional.aboutEpsPir': 'Sobre PIR e EPS',
      'nav.institutional.contact': 'Contato',
      'nav.main.contactButton': 'Entrar em contato'
    };
    
    return translations[key] || key;
  };

  return { t };
}
