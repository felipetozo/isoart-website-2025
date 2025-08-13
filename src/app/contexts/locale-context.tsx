'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SupportedLocale = 'pt-BR' | 'en' | 'es';

interface LocaleContextType {
  currentLocale: SupportedLocale;
  changeLocale: (newLocale: SupportedLocale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('pt-BR');

  // Carregar idioma salvo do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('isoart-locale') as SupportedLocale;
      if (saved && ['pt-BR', 'en', 'es'].includes(saved)) {
        setCurrentLocale(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar idioma:', error);
    }
  }, []);

  const changeLocale = (newLocale: SupportedLocale) => {
    setCurrentLocale(newLocale);
    // Salvar no localStorage
    try {
      localStorage.setItem('isoart-locale', newLocale);
    } catch (error) {
      console.error('Erro ao salvar idioma:', error);
    }
  };

  return (
    <LocaleContext.Provider value={{ currentLocale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale deve ser usado dentro de um LocaleProvider');
  }
  return context;
}
