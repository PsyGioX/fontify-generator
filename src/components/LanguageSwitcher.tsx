/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";
import type { MessageKey } from "@/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, t, availableLocales } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("languageSwitcher.select")}>
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLocales.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLocale(lang)}
            className={locale === lang ? "bg-accent" : ""}
          >
            {t(`language.${lang}` as MessageKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
