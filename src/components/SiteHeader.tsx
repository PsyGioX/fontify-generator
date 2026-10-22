/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { REPO_URL } from "@/lib/site";
import { GithubIcon, Logo } from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2.5 rounded-lg" aria-label={t("header.brand")}>
          <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
          <span className="text-lg font-semibold tracking-tight">{t("header.brand")}</span>
        </Link>
        <nav className="flex items-center gap-0.5" aria-label="Toolbar">
          <Button variant="ghost" size="icon" asChild>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" aria-label={t("header.github")}>
              <GithubIcon />
            </a>
          </Button>
          <ThemeToggle />
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
