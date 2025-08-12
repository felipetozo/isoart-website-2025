'use client';

import { useLocale } from '@/app/contexts/locale-context';

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

  const t = (key: string, defaultValue?: string) => {
    try {
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
    } catch (error) {
      console.error('Translation error:', error);
      return defaultValue || key;
    }
  };

  return {
    t,
    translations: translations[currentLocale],
    isLoading: false,
    currentLocale
  };
}
