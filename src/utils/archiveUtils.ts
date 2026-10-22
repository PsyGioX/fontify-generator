/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { escapeHtml, fileName, generateCss, toSlug, type FontSource } from "./fontUtils";

function exampleHtml(source: FontSource, cssFile: string): string {
  const family = escapeHtml(source.family);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${family} — Font Demo</title>
  <link rel="stylesheet" href="${cssFile}">
  <style>
    body {
      font-family: '${source.family}', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    h1 { font-size: clamp(2rem, 6vw, 3rem); }
    p { font-size: 1.2rem; line-height: 1.5; }
    .sample {
      margin: 2rem 0;
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>${family}</h1>
  <div class="sample">
    <p>
      The quick brown fox jumps over the lazy dog.<br>
      ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
      abcdefghijklmnopqrstuvwxyz<br>
      0123456789
    </p>
  </div>
</body>
</html>
`;
}

function triggerDownload(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Creates and downloads a ZIP archive with the CSS, the font file (if any) and a demo page. */
export async function downloadFontArchive(source: FontSource): Promise<void> {
  // Loaded on demand so JSZip stays out of the main bundle.
  const { default: JSZip } = await import("jszip");

  const slug = toSlug(source.family);
  const cssFile = `${slug}.css`;
  const zip = new JSZip();

  zip.file(cssFile, generateCss(source));
  if (source.kind === "file") {
    zip.file(fileName(source), source.file);
  }
  zip.file("example.html", exampleHtml(source, cssFile));

  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  triggerDownload(blob, `${slug}-font-package.zip`);
}
