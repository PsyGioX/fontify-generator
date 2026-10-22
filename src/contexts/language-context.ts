/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { createContext, useContext } from "react";
import type { MessageKey } from "@/i18n";

export interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  availableLocales: string[];
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
