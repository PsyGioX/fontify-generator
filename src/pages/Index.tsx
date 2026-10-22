/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import FontGenerator from "@/components/FontGenerator";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useLanguage } from "@/contexts/language-context";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="hero-glow flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("app.title")}
            </h1>
            <p className="mt-3 text-balance text-base text-muted-foreground sm:mt-4 sm:text-lg">
              {t("app.subtitle")}
            </p>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{t("app.privacy")}</p>
          </div>
          <FontGenerator />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
