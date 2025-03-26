
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ClipboardCopy, Check } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('css');
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  
  const handleCopy = (text: string, type: 'css' | 'html') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${type.toUpperCase()} copied to clipboard`);
        if (type === 'css') {
          setCopiedCss(true);
          setTimeout(() => setCopiedCss(false), 2000);
        } else {
          setCopiedHtml(true);
          setTimeout(() => setCopiedHtml(false), 2000);
        }
      })
      .catch(() => {
        toast.error(`Failed to copy ${type.toUpperCase()}`);
      });
  };
  
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card transition-all duration-300 animate-fade-in",
      className
    )}>
      <Tabs defaultValue="css" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b">
          <h3 className="text-lg font-medium">Generated Code</h3>
          <TabsList className="grid grid-cols-2 w-[180px]">
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="css" className="p-0 m-0">
          <div className="relative">
            <pre className="code-block m-0 rounded-t-none pt-10 min-h-[220px] max-h-[400px] text-sm overflow-auto">
              <code>{css || '/* CSS will appear here */'}</code>
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
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="html" className="p-0 m-0">
          <div className="relative">
            <pre className="code-block m-0 rounded-t-none pt-10 min-h-[220px] max-h-[400px] text-sm overflow-auto">
              <code>{html || '<!-- HTML will appear here -->'}</code>
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
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4" />
                  <span>Copy</span>
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
