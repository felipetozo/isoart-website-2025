'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/app/contexts/locale-context';
import type { SupportedLocale } from '@/app/lib/i18n';

// Importações estáticas das traduções
import ptBR from '@/app/data/locales/pt-BR.json';
import en from '@/app/data/locales/en.json';
import es from '@/app/data/locales/es.json';

const translations = {
  'pt-BR': ptBR,
  'en': en,
  'es': es
};

export function useTranslations() {
  const { currentLocale } = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [currentLocale]);

  const t = (key: string, defaultValue?: string) => {
    const currentTranslations = translations[currentLocale];
    if (!currentTranslations) return defaultValue || key;
    
    const keys = key.split('.');
    let value = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }
    
    return value || defaultValue || key;
  };

  return {
    t,
    translations: translations[currentLocale],
    isLoading,
    currentLocale
  };
}
