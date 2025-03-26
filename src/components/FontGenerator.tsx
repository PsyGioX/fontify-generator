
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ArrowRight, FileText, Link, Upload, Download } from 'lucide-react';
import FontPreview from './FontPreview';
import CodeOutput from './CodeOutput';
import { parseGoogleFontUrl, generateGoogleFontCss, generateGoogleFontHtml, processUploadedFont } from '@/utils/fontUtils';
import { downloadFontArchive } from '@/utils/archiveUtils';
import { useLanguage } from '@/contexts/LanguageContext';

const FontGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('google');
  const [googleFontUrl, setGoogleFontUrl] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [fontUrl, setFontUrl] = useState('');
  const [isGoogleFont, setIsGoogleFont] = useState(true);
  const [css, setCss] = useState('');
  const [html, setHtml] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const resetState = () => {
    setFontFamily('');
    setFontUrl('');
    setCss('');
    setHtml('');
    setShowPreview(false);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetState();
    setGoogleFontUrl('');
  };
  
  const handleGoogleFontProcess = () => {
    if (!googleFontUrl) {
      toast.error('Please enter a Google Font URL');
      return;
    }
    
    setIsProcessing(true);
    resetState();
    
    try {
      const fontData = parseGoogleFontUrl(googleFontUrl);
      if (!fontData) {
        toast.error('Invalid Google Font URL. Please check and try again.');
        setIsProcessing(false);
        return;
      }
      
      const generatedCss = generateGoogleFontCss(fontData);
      const generatedHtml = generateGoogleFontHtml(fontData);
      
      setFontFamily(fontData.family);
      setFontUrl(fontData.url);
      setIsGoogleFont(true);
      setCss(generatedCss);
      setHtml(generatedHtml);
      setShowPreview(true);
      
      toast.success(`Font "${fontData.family}" processed successfully`);
    } catch (error) {
      console.error('Error processing Google Font:', error);
      toast.error('Failed to process Google Font. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const validTypes = ['font/ttf', 'font/otf', 'application/x-font-ttf', 'application/x-font-otf'];
    // Also check file extension since MIME types can be unreliable
    const isValidExtension = /\.(ttf|otf)$/i.test(file.name);
    
    if (!validTypes.includes(file.type) && !isValidExtension) {
      toast.error('Please upload a valid font file (TTF or OTF)');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    
    setIsProcessing(true);
    resetState();
    
    try {
      const fontData = await processUploadedFont(file);
      if (!fontData) {
        toast.error('Failed to process font file. Please try again.');
        setIsProcessing(false);
        return;
      }
      
      setFontFamily(fontData.family);
      setFontUrl(fontData.previewUrl);
      setIsGoogleFont(false);
      setCss(fontData.css);
      setHtml(fontData.html);
      setShowPreview(true);
      
      toast.success(`Font "${fontData.family}" processed successfully`);
    } catch (error) {
      console.error('Error processing font file:', error);
      toast.error('Failed to process font file. Please try again.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadArchive = async () => {
    if (!fontFamily || !css) {
      toast.error(t('fontGenerator.noFontToDownload'));
      return;
    }

    setIsDownloading(true);
    try {
      await downloadFontArchive(fontFamily, css, fontUrl, isGoogleFont);
      toast.success(t('fontGenerator.downloadSuccess', { font: fontFamily }));
    } catch (error) {
      console.error('Download error:', error);
      toast.error(t('fontGenerator.downloadError'));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="google" className="flex items-center gap-2 py-3">
            <Link className="h-4 w-4" />
            <span>{t('fontGenerator.googleFontsTab')}</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2 py-3">
            <FileText className="h-4 w-4" />
            <span>{t('fontGenerator.uploadFontTab')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="google" className="animate-slide-up">
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">{t('fontGenerator.googleFontsTitle')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('fontGenerator.googleFontsDescription')}
            </p>
            
            <div className="flex gap-4 mb-2">
              <Input
                value={googleFontUrl}
                onChange={(e) => setGoogleFontUrl(e.target.value)}
                placeholder={t('fontGenerator.googleFontsPlaceholder')}
                className="flex-1"
              />
              <Button 
                onClick={handleGoogleFontProcess} 
                disabled={isProcessing || !googleFontUrl}
                className="gap-2"
              >
                {t('fontGenerator.processButton')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t('fontGenerator.googleFontsExample')}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="upload" className="animate-slide-up">
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">{t('fontGenerator.uploadFontTitle')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('fontGenerator.uploadFontDescription')}
            </p>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".ttf,.otf"
              className="hidden"
            />
            
            <Button 
              onClick={handleFileButtonClick} 
              variant="outline" 
              disabled={isProcessing}
              className="w-full h-24 border-dashed flex flex-col gap-2 hover:bg-muted/50"
            >
              <Upload className="h-6 w-6" />
              <span>{t('fontGenerator.selectFileButton')}</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {isProcessing && (
        <div className="mt-8 text-center animate-pulse">
          <p className="text-muted-foreground">{t('fontGenerator.processingMessage')}</p>
        </div>
      )}
      
      {showPreview && (
        <div className="mt-12 space-y-8 animate-slide-up">
          <Separator />
          
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{fontFamily}</h2>
            
            <Button 
              onClick={handleDownloadArchive} 
              variant="outline" 
              disabled={isDownloading}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span>{t('fontGenerator.downloadArchive')}</span>
              {isDownloading && <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>}
            </Button>
          </div>
          
          <FontPreview 
            fontFamily={fontFamily}
            fontUrl={fontUrl}
            isGoogleFont={isGoogleFont}
          />
          
          <CodeOutput 
            css={css}
            html={html}
          />
        </div>
      )}
    </div>
  );
};

export default FontGenerator;
