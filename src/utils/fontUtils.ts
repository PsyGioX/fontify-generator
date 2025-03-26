
// This utility extracts font data from Google Fonts URLs and generates CSS for font usage

/**
 * Extract font information from Google Fonts URL
 */
export function parseGoogleFontUrl(url: string): { 
  family: string; 
  weights: string[]; 
  url: string 
} | null {
  try {
    // Check if it's a Google Fonts URL
    if (!url.includes('fonts.google.com') && !url.includes('fonts.googleapis.com')) {
      return null;
    }
    
    let family = '';
    let weights: string[] = [];
    
    // Extract from display URL (fonts.google.com)
    if (url.includes('fonts.google.com')) {
      const familyMatch = url.match(/family=([^&:]+)/);
      if (familyMatch && familyMatch[1]) {
        family = decodeURIComponent(familyMatch[1].replace(/\+/g, ' '));
        
        // Find weights if specified
        const weightMatch = url.match(/wght@([0-9;]+)/);
        if (weightMatch && weightMatch[1]) {
          weights = weightMatch[1].split(';');
        } else {
          // Default weight
          weights = ['400'];
        }
      }
    }
    
    // Extract from API URL (fonts.googleapis.com)
    if (url.includes('fonts.googleapis.com')) {
      const familyMatch = url.match(/family=([^&:]+)(:([^&]+))?/);
      if (familyMatch && familyMatch[1]) {
        family = decodeURIComponent(familyMatch[1].replace(/\+/g, ' '));
        
        // Find weights if specified
        if (familyMatch[3]) {
          weights = familyMatch[3].split(',').map(w => w.trim());
        } else {
          // Default weight
          weights = ['400'];
        }
      }
    }
    
    if (!family) return null;
    
    // Construct standardized API URL
    const apiUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/ /g, '+')}`
      + (weights.length > 0 ? `:wght@${weights.join(';')}` : '')
      + '&display=swap';
    
    return {
      family,
      weights,
      url: apiUrl
    };
  } catch (error) {
    console.error('Error parsing Google Font URL:', error);
    return null;
  }
}

/**
 * Generate CSS for Google Font
 */
export function generateGoogleFontCss(fontData: { family: string; weights: string[]; url: string }): string {
  const { family, weights, url } = fontData;
  
  return `/* Google Font: ${family} */
@import url('${url}');

/* CSS rules to specify font */
.font-${family.toLowerCase().replace(/ /g, '-')} {
  font-family: '${family}', sans-serif;
}

/* Weight helper classes */
${weights.map(weight => `.font-${family.toLowerCase().replace(/ /g, '-')}-${weight} {
  font-weight: ${weight};
}`).join('\n')}`;
}

/**
 * Generate HTML for Google Font
 */
export function generateGoogleFontHtml(fontData: { family: string; url: string }): string {
  const { url } = fontData;
  
  return `<!-- Google Font import -->
<link rel="stylesheet" href="${url}">`;
}

/**
 * Process uploaded font file
 */
export async function processUploadedFont(file: File): Promise<{ 
  family: string; 
  css: string; 
  html: string;
  previewUrl: string;
} | null> {
  try {
    // Extract font name from filename (removing extension)
    const fontName = file.name.replace(/\.(ttf|otf)$/i, '');
    
    // Create object URL for the font file
    const fontUrl = URL.createObjectURL(file);
    
    // Generate CSS for using the font
    const css = `/* Font: ${fontName} */
@font-face {
  font-family: '${fontName}';
  src: url('${file.name}') format('${file.name.endsWith('.ttf') ? 'truetype' : 'opentype'}');
  font-weight: normal;
  font-style: normal;
}

/* CSS rules to specify font */
.font-${fontName.toLowerCase().replace(/ /g, '-')} {
  font-family: '${fontName}', sans-serif;
}`;

    // Generate HTML for importing the font
    const html = `<!-- Font import -->
<style>
  @font-face {
    font-family: '${fontName}';
    src: url('${file.name}') format('${file.name.endsWith('.ttf') ? 'truetype' : 'opentype'}');
    font-weight: normal;
    font-style: normal;
  }
</style>`;

    return { 
      family: fontName, 
      css, 
      html,
      previewUrl: fontUrl 
    };
  } catch (error) {
    console.error('Error processing uploaded font:', error);
    return null;
  }
}

/**
 * Load a font dynamically
 */
export function loadFontForPreview(fontFamily: string, fontUrl: string, isGoogleFont: boolean): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      if (isGoogleFont) {
        // For Google Fonts, use standard way
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fontUrl;
        link.onload = () => resolve(true);
        link.onerror = () => resolve(false);
        document.head.appendChild(link);
      } else {
        // For uploaded fonts, use FontFace API
        const font = new FontFace(fontFamily, `url(${fontUrl})`);
        font.load().then(() => {
          document.fonts.add(font);
          resolve(true);
        }).catch(() => {
          resolve(false);
        });
      }
    } catch (error) {
      console.error('Error loading font:', error);
      resolve(false);
    }
  });
}
