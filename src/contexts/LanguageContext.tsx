import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: string;
  isRTL: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read initial language from URL or localStorage
  const getInitialLanguage = () => {
    const urlLang = searchParams.get('lang');
    if (urlLang === 'ar' || urlLang === 'en') {
      return urlLang;
    }
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'ar') ? savedLang : 'en';
  };
  
  const [language, setLanguageState] = useState(getInitialLanguage);
  const [isRTL, setIsRTL] = useState(language === 'ar');

  const setLanguage = (lang: string) => {
    if (lang === 'ar' || lang === 'en') {
      setLanguageState(lang);
      setIsRTL(lang === 'ar');
      i18n.changeLanguage(lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      localStorage.setItem('language', lang);
      
      // Update URL param
      const newParams = new URLSearchParams(searchParams);
      newParams.set('lang', lang);
      setSearchParams(newParams, { replace: true });
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  // Sync URL param changes to language state
  useEffect(() => {
    const urlLang = searchParams.get('lang');
    if (urlLang && (urlLang === 'ar' || urlLang === 'en') && urlLang !== language) {
      setLanguageState(urlLang);
      setIsRTL(urlLang === 'ar');
      i18n.changeLanguage(urlLang);
      localStorage.setItem('language', urlLang);
      document.documentElement.lang = urlLang;
      document.documentElement.dir = urlLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [searchParams, language, i18n]);

  // Initialize language on mount
  useEffect(() => {
    const urlLang = searchParams.get('lang');
    const initialLang = urlLang || localStorage.getItem('language') || 'en';
    
    if (initialLang === 'ar' || initialLang === 'en') {
      i18n.changeLanguage(initialLang);
      document.documentElement.lang = initialLang;
      document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
      
      // Add lang param to URL if missing
      if (!urlLang) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('lang', initialLang);
        setSearchParams(newParams, { replace: true });
      }
    }
  }, []); // Only run once on mount

  const value: LanguageContextType = {
    language,
    isRTL,
    toggleLanguage,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};