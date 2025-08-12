'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supportedLocales, defaultLocale, type SupportedLocale } from '@/app/lib/i18n';

interface LocaleContextType {
  currentLocale: SupportedLocale;
  changeLocale: (newLocale: SupportedLocale) => void;
  getLocaleInfo: (locale: SupportedLocale) => { flag: string; name: string; code: string };
  isLoading: boolean;
  supportedLocales: readonly SupportedLocale[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(defaultLocale);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tentar recuperar o idioma salvo no localStorage
    const savedLocale = localStorage.getItem('isoart-locale') as SupportedLocale;
    if (savedLocale && supportedLocales.includes(savedLocale)) {
      setCurrentLocale(savedLocale);
    } else {
      // Tentar detectar o idioma do navegador
      const browserLocale = navigator.language;
      if (browserLocale.startsWith('en')) {
        setCurrentLocale('en');
      } else if (browserLocale.startsWith('es')) {
        setCurrentLocale('es');
      } else {
        setCurrentLocale('pt-BR');
      }
    }
    setIsLoading(false);
  }, []);

  const changeLocale = (newLocale: SupportedLocale) => {
    if (supportedLocales.includes(newLocale)) {
      setCurrentLocale(newLocale);
      localStorage.setItem('isoart-locale', newLocale);
      
      // Aqui você pode adicionar lógica adicional como redirecionamento
      // ou atualização da URL quando implementar as rotas multilíngue
    }
  };

  const getLocaleInfo = (locale: SupportedLocale) => {
    const localeInfo = {
      'pt-BR': { flag: '/icons/brazil.svg', name: 'Português', code: 'pt-BR' },
      'en': { flag: '/icons/uk.svg', name: 'English', code: 'en' },
      'es': { flag: '/icons/spain.svg', name: 'Español', code: 'es' }
    };
    return localeInfo[locale];
  };

  const value: LocaleContextType = {
    currentLocale,
    changeLocale,
    getLocaleInfo,
    isLoading,
    supportedLocales
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
