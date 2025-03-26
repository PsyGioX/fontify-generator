
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { loadFontForPreview } from '@/utils/fontUtils';

interface FontPreviewProps {
  fontFamily: string;
  fontUrl: string;
  isGoogleFont: boolean;
  className?: string;
}

const FontPreview: React.FC<FontPreviewProps> = ({
  fontFamily,
  fontUrl,
  isGoogleFont,
  className
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!fontFamily || !fontUrl) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    loadFontForPreview(fontFamily, fontUrl, isGoogleFont)
      .then((success) => {
        setIsLoaded(success);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoaded(false);
        setIsLoading(false);
      });
  }, [fontFamily, fontUrl, isGoogleFont]);
  
  if (isLoading) {
    return (
      <div className={cn(
        "p-6 rounded-xl border border-border bg-secondary/30 animate-pulse",
        className
      )}>
        <div className="h-8 bg-muted rounded-md w-3/4 mb-4"></div>
        <div className="h-4 bg-muted rounded-md w-full mb-2"></div>
        <div className="h-4 bg-muted rounded-md w-5/6 mb-2"></div>
        <div className="h-4 bg-muted rounded-md w-4/6"></div>
      </div>
    );
  }
  
  if (!isLoaded || !fontFamily) {
    return (
      <div className={cn(
        "p-6 rounded-xl border border-border bg-secondary/30",
        className
      )}>
        <p className="text-muted-foreground">Font preview unavailable</p>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "p-6 rounded-xl border border-border bg-secondary/30 transition-all duration-300 animate-fade-in",
      className
    )}>
      <h3 className="text-2xl font-semibold mb-6 text-balance">
        {fontFamily} Preview
      </h3>
      
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Headline</span>
          <h2 style={{ fontFamily: `"${fontFamily}", sans-serif` }} className="text-4xl font-semibold">
            The quick brown fox jumps over the lazy dog
          </h2>
        </div>
        
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Paragraph</span>
          <p style={{ fontFamily: `"${fontFamily}", sans-serif` }} className="text-base">
            Typography is the art and technique of arranging type to make written language legible,
            readable, and appealing when displayed. The arrangement of type involves selecting typefaces,
            point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between
            pairs of letters.
          </p>
        </div>
        
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Characters</span>
          <p style={{ fontFamily: `"${fontFamily}", sans-serif` }} className="text-xl tracking-wide">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            0123456789 !@#$%^&*()
          </p>
        </div>
      </div>
    </div>
  );
};

export default FontPreview;
