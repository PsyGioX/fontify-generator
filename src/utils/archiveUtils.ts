
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Creates and downloads a ZIP archive containing font files and CSS
 */
export async function downloadFontArchive(
  fontFamily: string, 
  css: string, 
  fontUrl?: string, 
  isGoogleFont: boolean = false
): Promise<void> {
  try {
    const zip = new JSZip();
    
    // Add CSS file
    zip.file(`${fontFamily.toLowerCase().replace(/ /g, '-')}.css`, css);
    
    // If we have a local font file, fetch and add it to the archive
    if (fontUrl && !isGoogleFont) {
      const fontResponse = await fetch(fontUrl);
      const fontBlob = await fontResponse.blob();
      const fontFileName = `${fontFamily.toLowerCase().replace(/ /g, '-')}.${fontBlob.type.includes('ttf') ? 'ttf' : 'otf'}`;
      zip.file(fontFileName, fontBlob);
    }
    
    // Add a simple HTML example
    const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fontFamily} - Font Demo</title>
  <link rel="stylesheet" href="${fontFamily.toLowerCase().replace(/ /g, '-')}.css">
  <style>
    body {
      font-family: '${fontFamily}', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 { font-size: 3rem; }
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
  <h1>${fontFamily}</h1>
  <div class="sample">
    <p>
      The quick brown fox jumps over the lazy dog.
      ABCDEFGHIJKLMNOPQRSTUVWXYZ
      abcdefghijklmnopqrstuvwxyz
      0123456789
    </p>
  </div>
</body>
</html>`;
    
    zip.file("example.html", htmlExample);
    
    // Generate the ZIP file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Save the ZIP file
    saveAs(content, `${fontFamily.toLowerCase().replace(/ /g, '-')}-font-package.zip`);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error creating font archive:', error);
    return Promise.reject(error);
  }
}
