'use client';

import { useRouter, usePathname } from 'next/navigation';

const locales = ['pt-BR', 'en', 'es'] as const;

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extrair locale do pathname
  const locale = pathname.split('/')[1] || 'pt-BR';

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
    console.log('🔍 changeLanguage chamado com:', newLocale);
    console.log('🔍 locale atual:', locale);
    console.log('🔍 pathname atual:', pathname);
    
    if (newLocale === locale) {
      console.log('❌ Mesmo idioma, não fazendo nada');
      return;
    }

    // Salvar no localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      console.log('💾 Locale salvo no localStorage:', newLocale);
    }

    // Navegar para a nova rota
    const currentPath = pathname;
    let newPath = '';
    
    // Se estamos em uma rota com idioma, substituir
    if (currentPath.startsWith('/pt-BR/') || currentPath.startsWith('/en/') || currentPath.startsWith('/es/')) {
      newPath = currentPath.replace(/^\/(pt-BR|en|es)/, `/${newLocale}`);
      console.log('🔄 Substituindo idioma na rota:', currentPath, '→', newPath);
    } else if (currentPath === '/pt-BR' || currentPath === '/en' || currentPath === '/es') {
      newPath = `/${newLocale}`;
      console.log('🔄 Rota de idioma simples:', currentPath, '→', newPath);
    } else if (currentPath === '/') {
      // Se estamos na raiz, ir para o novo idioma
      newPath = `/${newLocale}`;
      console.log('🔄 Rota raiz, indo para:', newPath);
    } else {
      // Se não estamos em uma rota com idioma, adicionar
      newPath = `/${newLocale}${currentPath}`;
      console.log('🔄 Adicionando idioma à rota:', currentPath, '→', newPath);
    }
    
    if (newPath && newPath !== currentPath) {
      console.log('🚀 Navegando para:', newPath);
      router.push(newPath);
    } else {
      console.log('❌ Mesma rota ou rota inválida, não navegando');
    }
  };

  return {
    currentLocale: locale,
    changeLanguage,
    getLocaleInfo,
    supportedLocales: locales
  };
};
