
export default {
  header: {
    brand: 'Fontify'
  },
  app: {
    title: 'Web Font Generator',
    subtitle: 'Create CSS for web fonts easily from Google Fonts or upload TTF/OTF files'
  },
  languageSwitcher: {
    select: 'Select language',
    en: 'English',
    ru: 'Russian'
  },
  language: {
    en: 'English',
    ru: 'Russian'
  },
  fontGenerator: {
    googleFontsTab: 'Google Fonts',
    uploadFontTab: 'Upload Font',
    googleFontsTitle: 'Generate from Google Fonts',
    googleFontsDescription: 'Enter a Google Fonts URL to generate CSS and connection code.',
    googleFontsPlaceholder: 'https://fonts.google.com/specimen/Roboto',
    googleFontsExample: 'Example: https://fonts.google.com/specimen/Roboto or https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
    uploadFontTitle: 'Generate from Font File',
    uploadFontDescription: 'Upload a TTF or OTF font file to generate CSS and connection code.',
    selectFileButton: 'Select TTF or OTF Font File',
    processButton: 'Process',
    processingMessage: 'Processing font...',
    downloadArchive: 'Download Package',
    noFontToDownload: 'No font available to download',
    downloadSuccess: '{{font}} package downloaded successfully',
    downloadError: 'Error downloading font package'
  },
  preview: {
    heading: 'Preview',
    unavailable: 'Preview not available',
    sampleText: 'Sample Text',
    sampleParagraph: 'The quick brown fox jumps over the lazy dog. 0123456789',
    headline: 'Headline',
    paragraph: 'Paragraph',
    characters: 'Characters'
  },
  codeOutput: {
    title: 'Code Output',
    css: 'CSS',
    html: 'HTML',
    copy: 'Copy',
    copied: 'Copied!',
    cssPlaceholder: 'CSS will be generated here...',
    htmlPlaceholder: 'HTML will be generated here...',
    successMessage: '{{type}} code copied to clipboard',
    errorMessage: 'Failed to copy {{type}} code'
  }
};
