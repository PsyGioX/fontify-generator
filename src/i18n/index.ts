/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import en, { type MessageKey, type Messages } from "./translations/en";
import ru from "./translations/ru";

export type { MessageKey };

export const translations: Record<string, Messages> = { en, ru };
export const availableLocales = Object.keys(translations);
export const DEFAULT_LOCALE = "en";
const STORAGE_KEY = "fontify-locale";

export function detectLocale(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in translations) return saved;
  } catch {
    // storage may be unavailable (private mode, blocked cookies)
  }
  const browser = (navigator.language || DEFAULT_LOCALE).split("-")[0].toLowerCase();
  return browser in translations ? browser : DEFAULT_LOCALE;
}

export function saveLocale(locale: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // ignore
  }
}

export function translate(
  locale: string,
  key: MessageKey,
  vars?: Record<string, string | number>
): string {
  const template = translations[locale]?.[key] ?? translations[DEFAULT_LOCALE][key] ?? key;
  if (!vars) return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : ""
  );
}
