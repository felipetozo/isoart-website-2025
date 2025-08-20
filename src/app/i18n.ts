import {getRequestConfig} from 'next-intl/server';

export const locales = ['pt-BR', 'en', 'es'] as const;
export const defaultLocale = 'pt-BR' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    return {
      locale: 'pt-BR',
      messages: {}
    };
  }

  return {
    locale,
    messages: {}
  };
});
