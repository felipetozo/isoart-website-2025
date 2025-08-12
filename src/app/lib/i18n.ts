// Configuração de internacionalização (i18n)
export const supportedLocales = ['pt-BR', 'en', 'es'] as const;
export type SupportedLocale = typeof supportedLocales[number];

export const defaultLocale: SupportedLocale = 'pt-BR';

// Função para obter traduções de um idioma específico
export async function getTranslations(locale: SupportedLocale) {
  try {
    const translations = await import(`@/app/data/locales/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Failed to load translations for locale: ${locale}, falling back to ${defaultLocale}`);
    // Fallback para idioma padrão
    const fallback = await import(`@/app/data/locales/${defaultLocale}.json`);
    return fallback.default;
  }
}

// Função para validar se um locale é suportado
export function isValidLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

// Função para obter locale do navegador ou padrão
export function getLocaleFromRequest(request: Request): SupportedLocale {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (preferredLocale === 'en') return 'en';
    if (preferredLocale === 'es') return 'es';
  }
  return defaultLocale;
}
