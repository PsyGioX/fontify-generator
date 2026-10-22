/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

/**
 * Pure helpers for parsing Google Fonts input, validating uploaded font files
 * and generating the CSS / HTML / Tailwind snippets.
 */

export const GOOGLE_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export const MAX_FONT_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export interface GoogleFontSource {
  kind: "google";
  family: string;
  weights: number[];
  italic: boolean;
}

export type FontFileExt = "ttf" | "otf" | "woff" | "woff2";

export interface FileFontSource {
  kind: "file";
  family: string;
  slug: string;
  ext: FontFileExt;
  file: File;
}

export type FontSource = GoogleFontSource | FileFontSource;

export type UploadErrorCode = "extension" | "size" | "signature" | "read";

export class FontUploadError extends Error {
  code: UploadErrorCode;
  constructor(code: UploadErrorCode) {
    super(code);
    this.name = "FontUploadError";
    this.code = code;
  }
}

const FAMILY_PATTERN = /^[\p{L}\p{N} _.-]{1,80}$/u;
const FORMAT_BY_EXT: Record<FontFileExt, string> = {
  ttf: "truetype",
  otf: "opentype",
  woff: "woff",
  woff2: "woff2",
};

/** Returns a safe family name or null. Prevents CSS / HTML injection. */
export function sanitizeFamily(raw: string): string | null {
  const name = raw.replace(/\s+/g, " ").trim();
  return FAMILY_PATTERN.test(name) ? name : null;
}

export function toSlug(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "font";
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeWeights(values: number[]): number[] {
  const allowed = new Set<number>(GOOGLE_WEIGHTS);
  const result = [...new Set(values)].filter((w) => allowed.has(w)).sort((a, b) => a - b);
  return result.length > 0 ? result : [400];
}

/** Parses the axis part of a css2 family spec, e.g. `ital,wght@0,400;1,700`. */
function parseAxisSpec(spec: string): { weights: number[]; italic: boolean } {
  const weights: number[] = [];
  let italic = false;

  const at = spec.indexOf("@");
  if (at === -1) {
    // Legacy css v1 syntax: `400,700italic`
    for (const part of spec.split(",")) {
      const m = /^(\d{3})(i|italic)?$/.exec(part.trim());
      if (m) {
        weights.push(Number(m[1]));
        if (m[2]) italic = true;
      }
    }
    return { weights: normalizeWeights(weights), italic };
  }

  const axes = spec.slice(0, at).split(",").map((a) => a.trim());
  const wghtIdx = axes.indexOf("wght");
  const italIdx = axes.indexOf("ital");

  for (const tuple of spec.slice(at + 1).split(";")) {
    const cells = tuple.split(",");
    if (italIdx !== -1 && cells[italIdx]?.trim() === "1") italic = true;
    if (wghtIdx === -1) continue;
    const cell = cells[wghtIdx]?.trim() ?? "";
    const range = /^(\d{1,4})\.\.(\d{1,4})$/.exec(cell);
    if (range) {
      const [lo, hi] = [Number(range[1]), Number(range[2])];
      for (const w of GOOGLE_WEIGHTS) if (w >= lo && w <= hi) weights.push(w);
    } else if (/^\d{1,4}$/.test(cell)) {
      weights.push(Number(cell));
    }
  }
  return { weights: normalizeWeights(weights), italic };
}

function parseFamilyParam(value: string): GoogleFontSource | null {
  const colon = value.indexOf(":");
  const name = sanitizeFamily(colon === -1 ? value : value.slice(0, colon));
  if (!name) return null;
  const spec = colon === -1 ? "" : value.slice(colon + 1);
  const { weights, italic } = spec ? parseAxisSpec(spec) : { weights: [400], italic: false };
  return { kind: "google", family: name, weights, italic };
}

/**
 * Accepts a fonts.google.com / fonts.googleapis.com URL or a bare family name.
 * The hostname is compared exactly, so look-alike domains are rejected.
 */
export function parseGoogleFontInput(input: string): GoogleFontSource | null {
  const value = input.trim();
  if (!value || value.length > 2048) return null;

  // Bare family name: "Roboto", "Playfair Display"
  if (!/[/:=?]/.test(value)) {
    const family = sanitizeFamily(value);
    return family ? { kind: "google", family, weights: [400], italic: false } : null;
  }

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  if (host === "fonts.googleapis.com") {
    const family = url.searchParams.get("family");
    return family ? parseFamilyParam(family) : null;
  }

  if (host === "fonts.google.com") {
    const specimen = /^\/specimen\/([^/]+)/.exec(url.pathname);
    if (specimen) {
      let decoded: string;
      try {
        decoded = decodeURIComponent(specimen[1].replace(/\+/g, " "));
      } catch {
        return null;
      }
      const family = sanitizeFamily(decoded);
      return family ? { kind: "google", family, weights: [400], italic: false } : null;
    }
    const param = url.searchParams.get("selection.family") ?? url.searchParams.get("family");
    return param ? parseFamilyParam(param) : null;
  }

  return null;
}

/** Builds a canonical css2 API URL for the given selection. */
export function buildGoogleCssUrl(source: GoogleFontSource): string {
  const weights = normalizeWeights(source.weights);
  const family = encodeURIComponent(source.family).replace(/%20/g, "+");
  let spec = "";

  if (source.italic) {
    const tuples = [0, 1].flatMap((ital) => weights.map((w) => `${ital},${w}`));
    spec = `:ital,wght@${tuples.join(";")}`;
  } else if (weights.length > 1 || weights[0] !== 400) {
    spec = `:wght@${weights.join(";")}`;
  }
  return `https://fonts.googleapis.com/css2?family=${family}${spec}&display=swap`;
}

export function fileFormat(ext: FontFileExt): string {
  return FORMAT_BY_EXT[ext];
}

export function fileName(source: FileFontSource): string {
  return `${source.slug}.${source.ext}`;
}

/** Generates the CSS snippet for a font source. */
export function generateCss(source: FontSource): string {
  const slug = toSlug(source.family);

  if (source.kind === "google") {
    const weightClasses = normalizeWeights(source.weights)
      .map((w) => `.font-${slug}-${w} {\n  font-weight: ${w};\n}`)
      .join("\n\n");
    return `/* Google Font: ${source.family} */
@import url('${buildGoogleCssUrl(source)}');

.font-${slug} {
  font-family: '${source.family}', sans-serif;
}

/* Weight helper classes */
${weightClasses}${source.italic ? "\n\n.italic {\n  font-style: italic;\n}" : ""}
`;
  }

  return `/* Font: ${source.family} */
@font-face {
  font-family: '${source.family}';
  src: url('${fileName(source)}') format('${fileFormat(source.ext)}');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.font-${slug} {
  font-family: '${source.family}', sans-serif;
}
`;
}

/** Generates the HTML snippet for a font source. */
export function generateHtml(source: FontSource): string {
  if (source.kind === "google") {
    return `<!-- Google Font: ${escapeHtml(source.family)} -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${escapeHtml(buildGoogleCssUrl(source))}">
`;
  }

  return `<!-- Font: ${escapeHtml(source.family)} -->
<style>
  @font-face {
    font-family: '${source.family}';
    src: url('${fileName(source)}') format('${fileFormat(source.ext)}');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
</style>
`;
}

/** Generates a Tailwind CSS v4 `@theme` snippet. */
export function generateTailwind(source: FontSource): string {
  const slug = toSlug(source.family);
  const face =
    source.kind === "file"
      ? `@font-face {
  font-family: '${source.family}';
  src: url('${fileName(source)}') format('${fileFormat(source.ext)}');
  font-display: swap;
}

`
      : `@import url('${buildGoogleCssUrl(source)}');\n\n`;

  return `/* Tailwind CSS v4 — add to your main stylesheet */
${face}@theme {
  --font-${slug}: '${source.family}', sans-serif;
}

/* Usage: <p class="font-${slug}">…</p> */
`;
}

// Signature check — the first bytes of every supported font container.
function hasFontSignature(bytes: Uint8Array, ext: FontFileExt): boolean {
  if (bytes.length < 4) return false;
  const tag = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
  const isSfnt =
    (bytes[0] === 0 && bytes[1] === 1 && bytes[2] === 0 && bytes[3] === 0) ||
    tag === "true" ||
    tag === "OTTO" ||
    tag === "ttcf";

  switch (ext) {
    case "ttf":
    case "otf":
      return isSfnt;
    case "woff":
      return tag === "wOFF";
    case "woff2":
      return tag === "wOF2";
  }
}

/** Validates an uploaded font file (extension, size and magic bytes). */
export async function processUploadedFont(file: File): Promise<FileFontSource> {
  const match = /\.(ttf|otf|woff2?|woff)$/i.exec(file.name);
  if (!match) throw new FontUploadError("extension");
  const ext = match[1].toLowerCase() as FontFileExt;

  if (file.size === 0 || file.size > MAX_FONT_FILE_SIZE) throw new FontUploadError("size");

  let header: Uint8Array;
  try {
    header = new Uint8Array(await file.slice(0, 4).arrayBuffer());
  } catch {
    throw new FontUploadError("read");
  }
  if (!hasFontSignature(header, ext)) throw new FontUploadError("signature");

  const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ");
  const family = sanitizeFamily(baseName) ?? sanitizeFamily(baseName.replace(/[^\p{L}\p{N} .-]/gu, "")) ?? "Custom Font";

  return { kind: "file", family, slug: toSlug(family), ext, file };
}
