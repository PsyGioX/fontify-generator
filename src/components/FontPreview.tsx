/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/language-context";
import { useFontLoader } from "@/hooks/useFontLoader";
import { cn } from "@/lib/utils";
import type { FontSource } from "@/utils/fontUtils";

interface Props {
  source: FontSource;
  className?: string;
}

interface Variant {
  weight: number;
  italic: boolean;
}

export default function FontPreview({ source, className }: Props) {
  const { t } = useLanguage();
  const status = useFontLoader(source);
  const [customText, setCustomText] = useState("");
  const [size, setSize] = useState(40);

  const text = customText || t("preview.sampleText");
  const stack = `'${source.family}', sans-serif`;

  const variants = useMemo<Variant[]>(() => {
    if (source.kind === "file") return [{ weight: 400, italic: false }];
    const normal = source.weights.map((weight) => ({ weight, italic: false }));
    return source.italic ? [...normal, ...source.weights.map((weight) => ({ weight, italic: true }))] : normal;
  }, [source]);

  const baseWeight = variants.reduce(
    (best, v) => (Math.abs(v.weight - 400) < Math.abs(best - 400) ? v.weight : best),
    variants[0].weight
  );

  if (status === "error") {
    return (
      <div role="alert" className={cn("panel p-5 sm:p-6", className)}>
        <p className="font-medium">{t("preview.unavailable")}</p>
        {source.kind === "google" && (
          <p className="mt-1 text-sm text-muted-foreground">{t("weights.loadError")}</p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("panel space-y-6 p-4 transition-opacity sm:p-6", status === "loading" && "opacity-60", className)}
      aria-busy={status === "loading"}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">{t("preview.heading")}</h3>
        {status === "loading" && <span className="text-xs text-muted-foreground">{t("preview.loading")}</span>}
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_14rem] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="preview-text">{t("preview.text")}</Label>
          <Input
            id="preview-text"
            value={customText}
            placeholder={t("preview.sampleText")}
            maxLength={200}
            onChange={(e) => setCustomText(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preview-size" className="flex justify-between">
            <span>{t("preview.size")}</span>
            <span className="tabular-nums text-muted-foreground">{size}px</span>
          </Label>
          <Slider
            id="preview-size"
            min={14}
            max={96}
            step={1}
            value={[size]}
            onValueChange={([v]) => setSize(v)}
            aria-label={t("preview.size")}
          />
        </div>
      </div>

      <section>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t("preview.variants")}
        </span>
        <ul className="divide-y divide-border rounded-xl border border-border">
          {variants.map(({ weight, italic }) => (
            <li key={`${weight}-${italic}`} className="px-4 py-3">
              <span className="mb-1 block text-xs tabular-nums text-muted-foreground">
                {weight}
                {italic ? ` · ${t("preview.italic")}` : source.kind === "file" ? ` · ${t("preview.regular")}` : ""}
              </span>
              <p
                className="break-words leading-tight"
                style={{
                  fontFamily: stack,
                  fontWeight: weight,
                  fontStyle: italic ? "italic" : "normal",
                  fontSize: `${size}px`,
                }}
              >
                {text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t("preview.paragraph")}
        </span>
        <p style={{ fontFamily: stack, fontWeight: baseWeight }} className="text-base leading-relaxed sm:text-lg">
          {t("preview.sampleParagraph")}
        </p>
      </section>

      <section>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t("preview.characters")}
        </span>
        <p
          style={{ fontFamily: stack, fontWeight: baseWeight }}
          className="break-all text-lg leading-relaxed tracking-wide sm:text-xl"
        >
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          0123456789 !@#$%^&amp;*()
        </p>
      </section>
    </div>
  );
}
