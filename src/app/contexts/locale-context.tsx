'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type SupportedLocale = 'pt-BR' | 'en' | 'es';

interface LocaleContextType {
  currentLocale: SupportedLocale;
  changeLocale: (newLocale: SupportedLocale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('pt-BR');

  const changeLocale = (newLocale: SupportedLocale) => {
    setCurrentLocale(newLocale);
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
