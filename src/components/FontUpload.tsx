/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { Upload } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

interface Props {
  disabled?: boolean;
  onFile: (file: File) => void;
}

export default function FontUpload({ disabled, onFile }: Props) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const open = () => inputRef.current?.click();

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const handleKey = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  };

  return (
    <div className="panel p-4 sm:p-6">
      <h2 className="mb-1.5 text-lg font-semibold sm:text-xl">{t("fontGenerator.uploadFontTitle")}</h2>
      <p className="mb-5 text-sm text-muted-foreground sm:text-base">
        {t("fontGenerator.uploadFontDescription")}
      </p>

      <input
        type="file"
        ref={inputRef}
        accept=".ttf,.otf,.woff,.woff2"
        className="hidden"
        tabIndex={-1}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={disabled ? undefined : open}
        onKeyDown={disabled ? undefined : handleKey}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-36 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input px-4 py-6 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          dragging ? "border-primary bg-accent" : "hover:bg-muted/60",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <Upload className="h-7 w-7 text-primary" aria-hidden="true" />
        <span className="text-sm font-medium sm:text-base">
          {dragging ? t("fontGenerator.dropActive") : t("fontGenerator.selectFileButton")}
        </span>
        <span className="text-xs text-muted-foreground">
          {t("fontGenerator.dropHint")} · TTF, OTF, WOFF, WOFF2
        </span>
      </div>
    </div>
  );
}
