module.exports = {
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en', 'es'],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // Configurações adicionais para App Router
  fallbackLng: {
    'en': ['en'],
    'es': ['es'],
    'pt-BR': ['pt-BR'],
    'default': ['pt-BR']
  },
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
  // Configuração para carregar traduções
  load: 'languageOnly',
}
