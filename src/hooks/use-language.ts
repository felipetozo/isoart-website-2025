'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '../app/i18n';

export const useLanguage = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  // Função para obter informações do idioma
  const getLocaleInfo = (locale: string) => {
    const localeInfo = {
      'pt-BR': { flag: '/icons/brazil.svg', name: 'Português' },
      'en': { flag: '/icons/eua.svg', name: 'English' },
      'es': { flag: '/icons/spain.svg', name: 'Español' }
    };
    return localeInfo[locale as keyof typeof localeInfo] || localeInfo['pt-BR'];
  };

  // Função para mudar idioma e navegar
  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return;

    // Salvar no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }

    // Navegar para a nova rota
    const currentPath = pathname;
    let newPath = currentPath;
    
    // Se estamos em uma rota com idioma, substituir
    if (currentPath.startsWith('/pt-BR/') || currentPath.startsWith('/en/') || currentPath.startsWith('/es/')) {
      newPath = currentPath.replace(/^\/(pt-BR|en|es)/, `/${newLocale}`);
    } else if (currentPath === '/pt-BR' || currentPath === '/en' || currentPath === '/es') {
      newPath = `/${newLocale}`;
    } else {
      // Se não estamos em uma rota com idioma, adicionar
      newPath = `/${newLocale}${currentPath}`;
    }
    
    if (newPath !== currentPath) {
      router.push(newPath);
    }
  };

  return {
    currentLocale: locale,
    changeLanguage,
    getLocaleInfo,
    supportedLocales: locales,
    t
  };
};
