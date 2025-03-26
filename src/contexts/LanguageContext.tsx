
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/i18n';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, options?: Record<string, any>) => string;
  availableLocales: string[];
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: () => '',
  availableLocales: ['en', 'ru'],
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(i18n.locale);
  const availableLocales = Object.keys(i18n.translations);

  useEffect(() => {
    i18n.locale = locale;
  }, [locale]);

  const t = (key: string, options?: Record<string, any>): string => {
    return i18n.t(key, options);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, availableLocales }}>
      {children}
    </LanguageContext.Provider>
  );
};
