
import { I18n } from 'i18n-js';
import en from './translations/en';
import ru from './translations/ru';

const i18n = new I18n({
  en,
  ru
});

// Set default locale
i18n.defaultLocale = 'en';

// Detect browser language
const detectLanguage = (): string => {
  const browserLang = navigator.language.split('-')[0];
  return Object.keys(i18n.translations).includes(browserLang) ? browserLang : 'en';
};

// Initialize with detected language
i18n.locale = detectLanguage();

export default i18n;
