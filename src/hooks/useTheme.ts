/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "fontify-theme";
const QUERY = "(prefers-color-scheme: dark)";

function readStoredTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {
    // ignore
  }
  return "system";
}

export function resolveDark(theme: Theme): boolean {
  return theme === "dark" || (theme === "system" && window.matchMedia(QUERY).matches);
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const dark = resolveDark(theme);
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

/** Applies the saved theme before React renders to avoid a flash. */
export function initTheme(): void {
  applyTheme(readStoredTheme());
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    if (theme !== "system") return;
    const media = window.matchMedia(QUERY);
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  return { theme, setTheme };
}
