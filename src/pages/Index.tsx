
import React from 'react';
import FontGenerator from '@/components/FontGenerator';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-8 px-6 border-b border-border/40 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2">
                <div className="h-3 w-3 bg-primary rounded-full"></div>
                <span className="text-sm font-medium tracking-wide text-muted-foreground">{t('header.brand')}</span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">{t('app.title')}</h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-6 py-12">
        <FontGenerator />
      </main>
      
      <footer className="w-full py-8 px-6 border-t border-border/40">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            {t('app.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <span className="text-xs font-medium tracking-wide text-muted-foreground">{t('header.brand')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
