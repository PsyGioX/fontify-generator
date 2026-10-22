/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useMemo, useState } from "react";
import { Download, FileText, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { downloadFontArchive } from "@/utils/archiveUtils";
import {
  FontUploadError,
  generateCss,
  generateHtml,
  generateTailwind,
  parseGoogleFontInput,
  processUploadedFont,
  type FontSource,
} from "@/utils/fontUtils";
import CodeOutput from "./CodeOutput";
import FontPreview from "./FontPreview";
import FontUpload from "./FontUpload";
import GoogleFontForm from "./GoogleFontForm";
import WeightSelector from "./WeightSelector";

const UPLOAD_ERRORS = {
  extension: "upload.errorExtension",
  size: "upload.errorSize",
  signature: "upload.errorSignature",
  read: "upload.errorRead",
} as const;

export default function FontGenerator() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("google");
  const [source, setSource] = useState<FontSource | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const output = useMemo(
    () =>
      source
        ? { css: generateCss(source), html: generateHtml(source), tailwind: generateTailwind(source) }
        : null,
    [source]
  );

  const handleTabChange = (value: string) => {
    setTab(value);
    setSource(null);
  };

  const handleGoogle = (raw: string) => {
    if (!raw.trim()) {
      toast.error(t("fontGenerator.enterUrl"));
      return;
    }
    const parsed = parseGoogleFontInput(raw);
    if (!parsed) {
      toast.error(t("fontGenerator.invalidUrl"));
      return;
    }
    setSource(parsed);
    toast.success(t("fontGenerator.processSuccess", { font: parsed.family }));
  };

  const handleFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await processUploadedFont(file);
      setSource(parsed);
      toast.success(t("fontGenerator.processSuccess", { font: parsed.family }));
    } catch (error) {
      if (error instanceof FontUploadError) {
        toast.error(t(UPLOAD_ERRORS[error.code]));
      } else {
        toast.error(t("fontGenerator.processError"));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!source) {
      toast.error(t("fontGenerator.noFontToDownload"));
      return;
    }
    setIsDownloading(true);
    try {
      await downloadFontArchive(source);
      toast.success(t("fontGenerator.downloadSuccess", { font: source.family }));
    } catch {
      toast.error(t("fontGenerator.downloadError"));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl animate-fade-in">
      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mx-auto mb-5 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="google">
            <LinkIcon className="h-4 w-4" />
            <span>{t("fontGenerator.googleFontsTab")}</span>
          </TabsTrigger>
          <TabsTrigger value="upload">
            <FileText className="h-4 w-4" />
            <span>{t("fontGenerator.uploadFontTab")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="google" className="animate-slide-up">
          <GoogleFontForm disabled={isProcessing} onSubmit={handleGoogle} />
        </TabsContent>
        <TabsContent value="upload" className="animate-slide-up">
          <FontUpload disabled={isProcessing} onFile={handleFile} />
        </TabsContent>
      </Tabs>

      {isProcessing && (
        <p className="mt-6 animate-pulse text-center text-sm text-muted-foreground" role="status">
          {t("fontGenerator.processingMessage")}
        </p>
      )}

      {source && output && (
        <div className="mt-8 space-y-6 animate-slide-up sm:mt-10">
          <Separator />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">{source.family}</h2>
              <p className="text-sm text-muted-foreground">
                {source.kind === "google" ? t("fontGenerator.sourceGoogle") : t("fontGenerator.sourceFile")}
              </p>
            </div>
            <Button onClick={handleDownload} variant="outline" disabled={isDownloading} className="w-full sm:w-auto">
              <Download />
              <span>{t("fontGenerator.downloadArchive")}</span>
              {isDownloading && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
            </Button>
          </div>

          {source.kind === "google" && (
            <WeightSelector
              weights={source.weights}
              italic={source.italic}
              onChange={(weights, italic) => setSource({ ...source, weights, italic })}
            />
          )}

          <FontPreview source={source} />
          <CodeOutput css={output.css} html={output.html} tailwind={output.tailwind} />
        </div>
      )}
    </div>
  );
}
