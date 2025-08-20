import {getRequestConfig} from 'next-intl/server';

export const locales = ['pt-BR', 'en', 'es'] as const;
export const defaultLocale = 'pt-BR' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    // Silently fallback to default locale without logging errors
    const messages = await import(`./[locale]/data/locales/${defaultLocale}.json`);
    return {
      locale: defaultLocale,
      messages: messages.default
    };
  }

  try {
    const messages = await import(`./[locale]/data/locales/${locale}.json`);
    return {
      locale,
      messages: messages.default
    };
  } catch (error) {
    // Silently fallback to default locale without logging errors
    const messages = await import(`./[locale]/data/locales/${defaultLocale}.json`);
    return {
      locale: defaultLocale,
      messages: messages.default
    };
  }
});
