/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { useEffect, useState } from "react";
import { buildGoogleCssUrl, type FontSource } from "@/utils/fontUtils";

export type FontLoadStatus = "loading" | "ready" | "error";

const LINK_ID = "fontify-preview-stylesheet";

/**
 * Loads the font for the live preview.
 * - Google Fonts: a single <link> that is swapped when the selection changes.
 * - Uploaded files: a FontFace built from the file bytes (no object URLs to leak).
 */
export function useFontLoader(source: FontSource): FontLoadStatus {
  const [result, setResult] = useState<{ key: string; status: FontLoadStatus } | null>(null);

  const key =
    source.kind === "google"
      ? `g:${buildGoogleCssUrl(source)}`
      : `f:${source.family}:${source.file.name}:${source.file.size}:${source.file.lastModified}`;

  // Until the effect reports a result for the current key, we are still loading.
  const status: FontLoadStatus = result?.key === key ? result.status : "loading";

  useEffect(() => {
    let cancelled = false;
    const setStatus = (next: FontLoadStatus) => setResult({ key, status: next });

    if (source.kind === "google") {
      const href = buildGoogleCssUrl(source);
      const link = document.getElementById(LINK_ID) as HTMLLinkElement | null ?? document.createElement("link");
      link.id = LINK_ID;
      link.rel = "stylesheet";

      const finish = (ok: boolean) => {
        if (!cancelled) setStatus(ok ? "ready" : "error");
      };

      const onLoad = () => {
        const variants = source.weights.flatMap((w) =>
          source.italic ? [`${w} 1em "${source.family}"`, `italic ${w} 1em "${source.family}"`] : [`${w} 1em "${source.family}"`]
        );
        Promise.all(variants.map((v) => document.fonts.load(v)))
          .catch(() => undefined)
          .then(() => finish(true));
      };

      link.addEventListener("load", onLoad, { once: true });
      link.addEventListener("error", () => finish(false), { once: true });
      link.href = href;
      if (!link.isConnected) document.head.appendChild(link);

      return () => {
        cancelled = true;
        link.removeEventListener("load", onLoad);
      };
    }

    let face: FontFace | null = null;
    source.file
      .arrayBuffer()
      .then((buffer) => {
        face = new FontFace(source.family, buffer);
        return face.load();
      })
      .then((loaded) => {
        if (cancelled) return;
        document.fonts.add(loaded);
        setStatus("ready");
      })
      .catch(() => {
        face = null;
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      if (face) document.fonts.delete(face);
    };
    // `key` captures every field of `source` that affects loading.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return status;
}
