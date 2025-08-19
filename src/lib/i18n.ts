import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar arquivos de tradução
import ptBR from '../app/data/locales/pt-BR.json';
import en from '../app/data/locales/en.json';
import es from '../app/data/locales/es.json';

const resources = {
  'pt-BR': {
    translation: ptBR
  },
  'en': {
    translation: en
  },
  'es': {
    translation: es
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR', // idioma padrão
    fallbackLng: 'pt-BR',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    // Configurações de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;
