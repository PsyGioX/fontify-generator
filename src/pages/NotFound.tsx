/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useLanguage } from "@/contexts/language-context";

const NotFound = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const previous = document.title;
    document.title = `404 — ${t("notFound.title")}`;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      document.title = previous;
      robots.remove();
    };
  }, [t]);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="hero-glow flex flex-1 items-center justify-center px-4 py-16 text-center">
        <div>
          <p className="text-6xl font-bold tracking-tight text-primary sm:text-7xl">404</p>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{t("notFound.title")}</h1>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">{t("notFound.description")}</p>
          <Button asChild className="mt-6">
            <Link to="/">{t("notFound.back")}</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
