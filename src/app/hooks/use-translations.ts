'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/app/contexts/locale-context';
import type { SupportedLocale } from '@/app/lib/i18n';

export function useTranslations() {
  const { currentLocale } = useLocale();
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const localeData = await import(`@/app/data/locales/${currentLocale}.json`);
        setTranslations(localeData.default);
      } catch (error) {
        console.error(`Failed to load translations for locale: ${currentLocale}`, error);
        // Fallback para português em caso de erro
        try {
          const fallbackData = await import('@/app/data/locales/pt-BR.json');
          setTranslations(fallbackData.default);
        } catch (fallbackError) {
          console.error('Failed to load fallback translations', fallbackError);
          setTranslations({});
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLocale]);

  const t = (key: string, defaultValue?: string) => {
    if (!translations) return defaultValue || key;
    
    const keys = key.split('.');
    let value = translations;
    
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
    translations,
    isLoading,
    currentLocale
  };
}
