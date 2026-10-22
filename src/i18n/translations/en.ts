/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

const en = {
  "seo.title": "Fontify — Free Web Font Generator for Google Fonts, TTF, OTF, WOFF",
  "seo.description": "Free web font generator: create CSS, HTML and Tailwind code for Google Fonts or your own TTF, OTF, WOFF and WOFF2 files. Live preview, weight picker and ZIP download. Runs in your browser.",
  "header.brand": "Fontify",
  "header.github": "View source on GitHub",
  "app.title": "Web Font Generator",
  "app.subtitle": "Create CSS, HTML and Tailwind code for web fonts from Google Fonts or your own font files.",
  "app.privacy": "Everything runs in your browser — uploaded files never leave your device.",
  "languageSwitcher.select": "Select language",
  "language.en": "English",
  "language.ru": "Русский",
  "theme.toggle": "Change theme",
  "theme.light": "Light",
  "theme.dark": "Dark",
  "theme.system": "System",

  "fontGenerator.googleFontsTab": "Google Fonts",
  "fontGenerator.uploadFontTab": "Upload Font",
  "fontGenerator.googleFontsTitle": "Generate from Google Fonts",
  "fontGenerator.googleFontsDescription": "Paste a Google Fonts URL or just type a font name to get CSS and connection code.",
  "fontGenerator.googleFontsLabel": "Google Fonts URL or font name",
  "fontGenerator.googleFontsPlaceholder": "https://fonts.google.com/specimen/Roboto",
  "fontGenerator.googleFontsExample": "Example: Roboto, https://fonts.google.com/specimen/Roboto or a fonts.googleapis.com/css2 link",
  "fontGenerator.popular": "Popular:",
  "fontGenerator.uploadFontTitle": "Generate from a font file",
  "fontGenerator.uploadFontDescription": "Upload a TTF, OTF, WOFF or WOFF2 file (up to 10 MB) to generate @font-face code.",
  "fontGenerator.selectFileButton": "Choose a font file",
  "fontGenerator.dropHint": "or drag and drop it here",
  "fontGenerator.dropActive": "Drop the font file here",
  "fontGenerator.processButton": "Generate",
  "fontGenerator.processingMessage": "Processing font…",
  "fontGenerator.downloadArchive": "Download package",
  "fontGenerator.noFontToDownload": "No font available to download",
  "fontGenerator.downloadSuccess": "{{font}} package downloaded",
  "fontGenerator.downloadError": "Could not create the font package",
  "fontGenerator.enterUrl": "Enter a Google Fonts URL or a font name",
  "fontGenerator.invalidUrl": "Invalid Google Fonts URL or font name. Please check it and try again.",
  "fontGenerator.processSuccess": "Font \"{{font}}\" is ready",
  "fontGenerator.processError": "Failed to process the font. Please try again.",
  "fontGenerator.sourceGoogle": "Google Fonts",
  "fontGenerator.sourceFile": "Uploaded file",

  "upload.errorExtension": "Please upload a TTF, OTF, WOFF or WOFF2 file",
  "upload.errorSize": "The file is empty or larger than 10 MB",
  "upload.errorSignature": "This file does not look like a valid font",
  "upload.errorRead": "Could not read the file",

  "weights.title": "Weights",
  "weights.italic": "Include italic",
  "weights.hint": "Select the weights to include. Some families don't provide every weight or italic style.",
  "weights.loadError": "Google Fonts could not load this selection. Try fewer weights or turn italic off.",

  "preview.heading": "Preview",
  "preview.unavailable": "Preview not available",
  "preview.loading": "Loading font…",
  "preview.sampleText": "Sphinx of black quartz, judge my vow",
  "preview.sampleParagraph": "The quick brown fox jumps over the lazy dog. 0123456789",
  "preview.text": "Preview text",
  "preview.size": "Size",
  "preview.variants": "Variants",
  "preview.paragraph": "Paragraph",
  "preview.characters": "Characters",
  "preview.regular": "Regular",
  "preview.italic": "Italic",

  "codeOutput.title": "Code",
  "codeOutput.css": "CSS",
  "codeOutput.html": "HTML",
  "codeOutput.tailwind": "Tailwind",
  "codeOutput.copy": "Copy",
  "codeOutput.copied": "Copied",
  "codeOutput.successMessage": "{{type}} code copied to clipboard",
  "codeOutput.errorMessage": "Failed to copy {{type}} code",

  "footer.copyright": "© {{years}}",
  "footer.rights": "Open source on GitHub",

  "notFound.title": "Page not found",
  "notFound.description": "The page you are looking for does not exist or has been moved.",
  "notFound.back": "Back to Fontify",
} as const;

export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;
export default en as Messages;
