/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useLanguage } from "@/contexts/language-context";
import { AUTHOR_NAME, AUTHOR_URL, REPO_URL, copyrightYears } from "@/lib/site";
import { GithubIcon } from "./Logo";

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="safe-bottom w-full border-t border-border/60 px-4 pt-6 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
        <p>
          {t("footer.copyright", { years: copyrightYears() })}{" "}
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {AUTHOR_NAME}
          </a>
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 underline-offset-4 hover:text-foreground hover:underline"
        >
          <GithubIcon className="h-4 w-4" />
          {t("footer.rights")}
        </a>
      </div>
    </footer>
  );
}
