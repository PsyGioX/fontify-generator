/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { availableLocales, detectLocale, saveLocale, translate, type MessageKey } from "@/i18n";
import { LanguageContext } from "./language-context";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<string>(detectLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    // Keep the document metadata in sync with the UI language.
    if (!document.title.startsWith("404")) document.title = translate(locale, "seo.title");
    const description = translate(locale, "seo.description");
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", locale === "ru" ? "ru_RU" : "en_US");
  }, [locale]);

  const setLocale = useCallback((next: string) => {
    setLocaleState(next);
    saveLocale(next);
  }, []);

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) => translate(locale, key, vars),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, availableLocales }),
    [locale, setLocale, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
