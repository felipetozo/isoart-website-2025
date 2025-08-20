import {getRequestConfig} from 'next-intl/server';

// Importar todas as traduções estaticamente
import ptBR from './data/locales/pt-BR.json';
import en from './data/locales/en.json';
import es from './data/locales/es.json';

export const locales = ['pt-BR', 'en', 'es'] as const;
export const defaultLocale = 'pt-BR' as const;

export type Locale = (typeof locales)[number];

// Mapear as traduções
const messages = {
  'pt-BR': ptBR,
  'en': en,
  'es': es
};

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    return {
      locale: 'pt-BR',
      messages: messages['pt-BR']
    };
  }

  const localeMessages = messages[locale as keyof typeof messages] || messages['pt-BR'];

  return {
    locale,
    messages: localeMessages
  };
});
