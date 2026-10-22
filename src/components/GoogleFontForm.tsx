/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/language-context";

const POPULAR = ["Roboto", "Inter", "Montserrat", "Playfair Display", "JetBrains Mono", "Lobster"];

interface Props {
  disabled?: boolean;
  onSubmit: (value: string) => void;
}

export default function GoogleFontForm({ disabled, onSubmit }: Props) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <div className="panel p-4 sm:p-6">
      <h2 className="mb-1.5 text-lg font-semibold sm:text-xl">{t("fontGenerator.googleFontsTitle")}</h2>
      <p className="mb-5 text-sm text-muted-foreground sm:text-base">
        {t("fontGenerator.googleFontsDescription")}
      </p>

      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1 space-y-2">
          <Label htmlFor="google-font-input" className="sr-only">
            {t("fontGenerator.googleFontsLabel")}
          </Label>
          <Input
            id="google-font-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("fontGenerator.googleFontsPlaceholder")}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            inputMode="url"
            maxLength={2048}
          />
        </div>
        <Button type="submit" disabled={disabled || !value.trim()} className="w-full sm:w-auto">
          {t("fontGenerator.processButton")}
          <ArrowRight />
        </Button>
      </form>

      <p className="mt-2 text-xs text-muted-foreground">{t("fontGenerator.googleFontsExample")}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">{t("fontGenerator.popular")}</span>
        {POPULAR.map((name) => (
          <button
            key={name}
            type="button"
            disabled={disabled}
            onClick={() => {
              setValue(name);
              onSubmit(name);
            }}
            className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
