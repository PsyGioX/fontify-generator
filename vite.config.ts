/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * Public site URL used for canonical / Open Graph / sitemap.
 * Set VITE_SITE_URL in your hosting environment; on Vercel the production
 * domain is picked up automatically.
 */
const SITE_URL = (
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://fontify-generator.vercel.app")
).replace(/\/+$/, "");

function seo(): Plugin {
  return {
    name: "fontify-seo",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replaceAll("%SITE_URL%", SITE_URL),
    },
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Fontify Generator - Copyright (c) 2025-2026 PsyGioX - https://github.com/PsyGioX/fontify-generator -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `# Fontify Generator - Copyright (c) 2025-2026 PsyGioX - https://github.com/PsyGioX/fontify-generator\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [react(), tailwindcss(), seo()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: false,
    target: "es2022",
  },
});
