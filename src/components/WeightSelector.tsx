/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { GOOGLE_WEIGHTS } from "@/utils/fontUtils";

interface Props {
  weights: number[];
  italic: boolean;
  onChange: (weights: number[], italic: boolean) => void;
}

export default function WeightSelector({ weights, italic, onChange }: Props) {
  const { t } = useLanguage();

  const toggle = (weight: number) => {
    const next = weights.includes(weight) ? weights.filter((w) => w !== weight) : [...weights, weight];
    if (next.length === 0) return; // keep at least one weight
    onChange(next.sort((a, b) => a - b), italic);
  };

  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">{t("weights.title")}</h3>
        <label className="inline-flex min-h-8 cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={italic}
            onChange={(e) => onChange(weights, e.target.checked)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          {t("weights.italic")}
        </label>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("weights.title")}>
        {GOOGLE_WEIGHTS.map((w) => {
          const active = weights.includes(w);
          return (
            <button
              key={w}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(w)}
              className={cn(
                "min-h-9 min-w-12 rounded-lg border px-3 text-sm font-medium tabular-nums transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-card hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {w}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{t("weights.hint")}</p>
    </div>
  );
}
