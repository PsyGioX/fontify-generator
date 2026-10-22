/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useState } from "react";
import { Check, ClipboardCopy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

interface Props {
  css: string;
  html: string;
  tailwind: string;
  className?: string;
}

type Kind = "css" | "html" | "tailwind";

export default function CodeOutput({ css, html, tailwind, className }: Props) {
  const { t } = useLanguage();
  const [active, setActive] = useState<Kind>("css");
  const [copied, setCopied] = useState<Kind | null>(null);

  const snippets: Record<Kind, string> = { css, html, tailwind };
  const labels: Record<Kind, string> = {
    css: t("codeOutput.css"),
    html: t("codeOutput.html"),
    tailwind: t("codeOutput.tailwind"),
  };

  const handleCopy = async (kind: Kind) => {
    const ok = await copyText(snippets[kind]);
    if (ok) {
      toast.success(t("codeOutput.successMessage", { type: labels[kind] }));
      setCopied(kind);
      setTimeout(() => setCopied((c) => (c === kind ? null : c)), 2000);
    } else {
      toast.error(t("codeOutput.errorMessage", { type: labels[kind] }));
    }
  };

  return (
    <div className={cn("panel overflow-hidden", className)}>
      <Tabs value={active} onValueChange={(v) => setActive(v as Kind)} className="w-full">
        <div className="flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <h3 className="px-1 text-lg font-semibold">{t("codeOutput.title")}</h3>
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            {(Object.keys(labels) as Kind[]).map((kind) => (
              <TabsTrigger key={kind} value={kind}>
                {labels[kind]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {(Object.keys(snippets) as Kind[]).map((kind) => (
          <TabsContent key={kind} value={kind} className="relative m-0">
            <pre
              className="code-block m-0 max-h-96 min-h-48 p-4 pr-4 pt-14 sm:pt-12"
              tabIndex={0}
              aria-label={labels[kind]}
            >
              <code>{snippets[kind]}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute right-3 top-3"
              onClick={() => handleCopy(kind)}
            >
              {copied === kind ? <Check /> : <ClipboardCopy />}
              <span>{copied === kind ? t("codeOutput.copied") : t("codeOutput.copy")}</span>
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
