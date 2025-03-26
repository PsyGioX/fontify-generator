
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ClipboardCopy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CodeOutputProps {
  css: string;
  html: string;
  className?: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({
  css,
  html,
  className
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('css');
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  
  const handleCopy = (text: string, type: 'css' | 'html') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(t('codeOutput.successMessage', { type: type.toUpperCase() }));
        if (type === 'css') {
          setCopiedCss(true);
          setTimeout(() => setCopiedCss(false), 2000);
        } else {
          setCopiedHtml(true);
          setTimeout(() => setCopiedHtml(false), 2000);
        }
      })
      .catch(() => {
        toast.error(t('codeOutput.errorMessage', { type: type.toUpperCase() }));
      });
  };
  
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card transition-all duration-300 animate-fade-in",
      className
    )}>
      <Tabs defaultValue="css" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b">
          <h3 className="text-lg font-medium">{t('codeOutput.title')}</h3>
          <TabsList className="grid grid-cols-2 w-[180px]">
            <TabsTrigger value="css">{t('codeOutput.css')}</TabsTrigger>
            <TabsTrigger value="html">{t('codeOutput.html')}</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="css" className="p-0 m-0">
          <div className="relative">
            <pre className="code-block m-0 rounded-t-none pt-10 min-h-[220px] max-h-[400px] text-sm overflow-auto">
              <code>{css || t('codeOutput.cssPlaceholder')}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-8 gap-1"
              onClick={() => handleCopy(css, 'css')}
              disabled={!css || copiedCss}
            >
              {copiedCss ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>{t('codeOutput.copied')}</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4" />
                  <span>{t('codeOutput.copy')}</span>
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="html" className="p-0 m-0">
          <div className="relative">
            <pre className="code-block m-0 rounded-t-none pt-10 min-h-[220px] max-h-[400px] text-sm overflow-auto">
              <code>{html || t('codeOutput.htmlPlaceholder')}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-8 gap-1"
              onClick={() => handleCopy(html, 'html')}
              disabled={!html || copiedHtml}
            >
              {copiedHtml ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>{t('codeOutput.copied')}</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4" />
                  <span>{t('codeOutput.copy')}</span>
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeOutput;
